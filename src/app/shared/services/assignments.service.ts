import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, of, tap } from 'rxjs';
import { Assignment } from '../../assignments/models/assignments.model';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { bdInitialAssignments } from '../datas/data-initial-assignments';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  getAssignmentsByMonth(assignments: Assignment[] | undefined): any[] {
    let nbAssignmentsByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    assignments?.forEach(a => {
      let data = new Date(a.dateDeRendu);
      let month = data.getMonth();
      nbAssignmentsByMonth[month]++;
    });
    return nbAssignmentsByMonth;
  }
  // return of(assignment);
  getAssignmentsPagine(page: number, limit: number) {
    return this.http.get<any>(this.url + '?page=' + page + '&limit=' + limit);
  }

  private HttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  url = 'http://localhost:8010/api/db-angular-project';
  bdInitialAssignments = bdInitialAssignments;

  // assignments: Assignment[] = [];
  idCurrent: number = 0;

  constructor(private http: HttpClient) { }

  getAssignment(id: number): Observable<Assignment | undefined> {
    // const assignment:Assignment|undefined = this.assignments.find(a => a.id === id);
    // return of(assignment);
    return this.http.get<Assignment>(this.url + '/' + id)
      .pipe(tap(_ => {
        console.log(`tap: assignment avec id=${id} requête envoyée sur le serveur MongoDB Cloud Atlas`);
      }),
        catchError(this.handleError<Assignment>(`getAssignment id=${id}`)));
  }

  getAssignments() {
    // return of(this.assignments);
    return this.http.get<any>(this.url + '?page=all');
  }

  addAssignment(assignment: Assignment): Observable<any> {
    // this.assignments.push(assignment);
    // this.idCurrent = this.assignments.length + 1;
    // this.loggingService.log(assignment.nom, "ajouté");

    // console.log(assignment);
    if (!assignment.id) {
      this.idCurrent++;
      assignment.id = this.idCurrent;
    }
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
      newAssignment.nom = a.nom;
      newAssignment.dateDeRendu = new Date(a.dateDeRendu);

      const newMatiere = [
        {nom_matiere: a.nom.substring(3),
        image_matiere: "",
        image_prof: ""}
      ];
      newAssignment.matiere = newMatiere[0];
      appelVersAddAssignement.push(this.addAssignment(newAssignment));
      this.idCurrent = bdInitialAssignments.length;
    });
    return forkJoin(appelVersAddAssignement);
  }
}

