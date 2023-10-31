import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, of, tap } from 'rxjs';
import { Assignment } from '../assignments/assignments.model';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  // return of(assignment);
  getAssignmentsPagine(page: number, limit: number) {
    return this.http.get<any>(this.url + '?page=' + page + '&limit=' + limit);
  }

  private HttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  url = 'http://localhost:8010/api/assignments';
  bdInitialAssignments = bdInitialAssignments;

  // assignments: Assignment[] = [];

  // idCurrent: number = this.assignments.length + 1;

  constructor(private loggingService: LoggingService,
    private http: HttpClient) { }

  getAssignment(id: number): Observable<Assignment | undefined> {
    // const assignment:Assignment|undefined = this.assignments.find(a => a.id === id);
    // return of(assignment);
    return this.http.get<Assignment>(this.url + '/' + id)
      .pipe(tap(_ => {
        console.log(`tap: assignment avec id=${id} requête envoyée sur le serveur MongoDB Cloud Atlas`);
      }),
        catchError(this.handleError<Assignment>(`getAssignment id=${id}`)));
  }

  getAssignments(): Observable<Assignment[]> {
    // return of(this.assignments);
    return this.http.get<Assignment[]>(this.url);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    // this.assignments.push(assignment);
    // this.idCurrent = this.assignments.length + 1;
    // this.loggingService.log(assignment.nom, "ajouté");
    console.log(assignment);
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<Assignment>(this.url, assignment, this.HttpOptions);
  }

  deleteAssignment(assignment: Assignment): Observable<String> {

    // let index = this.assignments.indexOf(assignment);
    // if(index > -1){
    //   // this.idCurrent = assignment.id ;
    //   this.assignments.splice(index, 1);
    // }
    // this.loggingService.log(assignment.nom, "supprimé");
    // return of("Assignment service: Assignment supprimé");
    let deleteUrl = this.url + '/' + assignment._id;
    return this.http.delete<String>(deleteUrl);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error("erreur : " + error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  peuplerBDAvecForkJoin() {
    let appelVersAddAssignement: Observable<any>[] = [];

    bdInitialAssignments.forEach(a => {
      const newAssignment = new Assignment();
      newAssignment.id = a.id;
      newAssignment.nom = a.nom;
      newAssignment.dateDeRendu = new Date(a.dateDeRendu);
      newAssignment.rendu = a.rendu;
      appelVersAddAssignement.push(this.addAssignment(newAssignment));
    });
    return forkJoin(appelVersAddAssignement);
  }
}
