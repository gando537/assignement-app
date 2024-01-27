import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, of, tap, BehaviorSubject } from 'rxjs';
import { Assignment } from '../../assignments/models/assignments.model';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { bdInitialAssignments } from '../datas/data-initial-assignments';
import { Color } from 'highcharts';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  url = 'https://api-assignment-sigma.vercel.app/api/db-angular-project/';

  private assignmentsSource = new BehaviorSubject<any[]>([]);
  currentAssignments = this.assignmentsSource.asObservable();

  changeAssignments(assignments: any[]) {
    this.assignmentsSource.next(assignments);
  }

  getAssignmentsByStatus(assignments: Assignment[] | undefined): any[] {
    let nbAssignmentsByDate: [string, string, string, string, string, Boolean, number][] = [];
    assignments?.forEach(a => {
      let img = a.matiere.image_matiere;
      let data = new Date(a.dateDeRendu);
      let month = data.getMonth();
      let day = data.getDate();
      let year = data.getFullYear();
      let author = a.auteur;
      let nom_matiere = a.matiere.nom_matiere;
      let status = a.rendu;
      let note = a.note ? a.note : 0;
      nbAssignmentsByDate.push([img, day + '/' + month + '/' + year, a.nom, author, nom_matiere, status, note]);
    });
    return nbAssignmentsByDate;
  }

  getAssignmentsMoyenneNote(assignments: Assignment[] | undefined): any[] {
    let nbAssignmentsByMatiere: [string, number][] = [
      ["Web(Angular)", 0],
      ["BD", 0],
      ["Outils d'ingénierie", 0],
      ["Diagnostic et gestion financière", 0],
      ["Cadrage d'un projet SI", 0],
      ["Composants logiciels pour l'entreprise", 0],
      ["Communication", 0]
    ];
    assignments?.forEach(a => {
      let matiere = a.matiere.nom_matiere;
      switch (matiere) {
        case "Web(Angular)":
          nbAssignmentsByMatiere[0][1] += a.note ? a.note : 0;
          break;
        case "BD":
          nbAssignmentsByMatiere[1][1] += a.note ? a.note : 0;
          break;
        case "Outils d'ingénierie":
          nbAssignmentsByMatiere[2][1] += a.note ? a.note : 0;
          break;
        case "Diagnostic et gestion financière":
          nbAssignmentsByMatiere[3][1] += a.note ? a.note : 0;
          break;
        case "Cadrage d'un projet SI":
          nbAssignmentsByMatiere[4][1] += a.note ? a.note : 0;
          break;
        case "Composants logiciels pour l'entreprise":
          nbAssignmentsByMatiere[5][1] += a.note ? a.note : 0;
          break;
        case "Communication":
          nbAssignmentsByMatiere[6][1] += a.note ? a.note : 0;
          break;
      }
    });
    const nbAssignments = this.getAssignmentsRendu(assignments);
    nbAssignmentsByMatiere.forEach(a => {
      let note = a[1];
      let nb = nbAssignments.find(n => n[0] === a[0])[1];
      a[1] = note / nb;
    });
    return nbAssignmentsByMatiere;
  }

  getAssignmentsRendu(assignments: Assignment[] | undefined): any[] {
    let nbAssignmentsByMatiere: [string, number][] = [
      ["Web(Angular)", 0],
      ["BD", 0],
      ["Outils d'ingénierie", 0],
      ["Diagnostic et gestion financière", 0],
      ["Cadrage d'un projet SI", 0],
      ["Composants logiciels pour l'entreprise", 0],
      ["Communication", 0]
    ];
    assignments?.forEach(a => {
      if (a.rendu) {
        let matiere = a.matiere.nom_matiere;
        switch (matiere) {
          case "Web(Angular)":
            nbAssignmentsByMatiere[0][1]++;
            break;
          case "BD":
            nbAssignmentsByMatiere[1][1]++;
            break;
          case "Outils d'ingénierie":
            nbAssignmentsByMatiere[2][1]++;
            break;
          case "Diagnostic et gestion financière":
            nbAssignmentsByMatiere[3][1]++;
            break;
          case "Cadrage d'un projet SI":
            nbAssignmentsByMatiere[4][1]++;
            break;
          case "Composants logiciels pour l'entreprise":
            nbAssignmentsByMatiere[5][1]++;
            break;
          case "Communication":
            nbAssignmentsByMatiere[6][1]++;
            break;
        }
      }
    });
    return nbAssignmentsByMatiere;
  }

  getAssignmentsByMatiere(assignments: Assignment[] | undefined): any[] {
    let nbAssignmentsByMatiere: [string, number][] = [
      ["Web(Angular)", 0],
      ["BD", 0],
      ["Outils d'ingénierie", 0],
      ["Diagnostic et gestion financière", 0],
      ["Cadrage d'un projet SI", 0],
      ["Composants logiciels pour l'entreprise", 0],
      ["Communication", 0]
    ];
    assignments?.forEach(a => {
      let matiere = a.matiere.nom_matiere;
      switch (matiere) {
        case "Web(Angular)":
          nbAssignmentsByMatiere[0][1]++;
          break;
        case "BD":
          nbAssignmentsByMatiere[1][1]++;
          break;
        case "Outils d'ingénierie":
          nbAssignmentsByMatiere[2][1]++;
          break;
        case "Diagnostic et gestion financière":
          nbAssignmentsByMatiere[3][1]++;
          break;
        case "Cadrage d'un projet SI":
          nbAssignmentsByMatiere[4][1]++;
          break;
        case "Composants logiciels pour l'entreprise":
          nbAssignmentsByMatiere[5][1]++;
          break;
        case "Communication":
          nbAssignmentsByMatiere[6][1]++;
          break;
      }
    });
    return nbAssignmentsByMatiere;
  }

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
  getAssignmentsPagine(page: number, limit: number, searchTerm?: string): Observable<any> {
    let url = this.url + '?page=' + page + '&limit=' + limit;
    if (searchTerm) {
      url += '&search=' + searchTerm;
    }
    return this.http.get<any>(url);
  }

  private HttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  bdInitialAssignments = bdInitialAssignments;

  // assignments: Assignment[] = [];
  idCurrent: number = 0;

  constructor(private http: HttpClient) { }

  getAssignment(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(this.url + id)
      .pipe(tap(_ => {
        console.log(`tap: assignment avec id=${id} requête envoyée sur le serveur MongoDB Cloud Atlas`);
      }),
        catchError(this.handleError<Assignment>(`getAssignment id=${id}`)));
  }

  getUniqueAssignments(): Observable<any> {
    return this.http.get<any>(this.url + 'uniques');
  }


  getAssignments() {
    // return of(this.assignments);
    return this.http.get<any>(this.url + '?page=all');
  }

  addAssignment(assignment: Assignment): Observable<any> {

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

    let deleteUrl = this.url + assignment.id;
    return this.http.delete<String>(deleteUrl);
  }

  deleteAssignmentUnique(name: String): Observable<String> {

      let deleteUrl = this.url + 'uniques/' + name;
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
        {
          nom_matiere: a.nom.substring(3),
          image_matiere: "",
          image_prof: ""
        }
      ];
      newAssignment.matiere = newMatiere[0];
      appelVersAddAssignement.push(this.addAssignment(newAssignment));
      this.idCurrent = bdInitialAssignments.length;
    });
    return forkJoin(appelVersAddAssignement);
  }
}
