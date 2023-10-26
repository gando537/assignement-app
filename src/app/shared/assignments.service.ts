import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignments.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  titre : String = "Mon application Angular sur les assignments";
  assignments: Assignment[] = [
    {
      id: 1,
      nom: "Vive les maths",
      dateDeRendu: new Date('2021-03-01'),
      rendu: true
    },
    {
      id: 2,
      nom: "Vive la physique",
      dateDeRendu: new Date('2023-03-05'),
      rendu: false
    },
    {
      id: 3,
      nom: "Angular c'est encore mieux",
      dateDeRendu: new Date('2021-03-10'),
      rendu: false
    }];

    idCurrent: number = this.assignments.length + 1;

  constructor(private loggingService:LoggingService) { }

  getAssignment(id:number): Observable<Assignment|undefined> {
    const assignment:Assignment|undefined = this.assignments.find(a => a.id === id);
    return of(assignment);
  }

  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments);
  }

  addAssignment(assignment: Assignment): Observable<String> {
    this.assignments.push(assignment);
    this.idCurrent = this.assignments.length + 1;
    this.loggingService.log(assignment.nom, " ajouté");
    return of("Assignment ajouté");
  }

  updateAssignment(assignment: Assignment): Observable<String>{
    return of("Assignment service: Assignment modifié");
  }

  deleteAssignment(assignment: Assignment): Observable<String>{

    let index = this.assignments.indexOf(assignment);
    if(index > -1){
      this.idCurrent = assignment.id ;
      this.assignments.splice(index, 1);
    }
    this.loggingService.log(assignment.nom, "supprimé");
    return of("Assignment service: Assignment supprimé");
  }
}
