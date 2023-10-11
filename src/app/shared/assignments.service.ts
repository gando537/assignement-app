import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignments.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  titre : String = "Mon application Angular sur les assignments"
  assignments: Assignment[] = [
    {
      nom: "Vive les maths",
      dateDeRendu: new Date('2021-03-01'),
      rendu: true
    },
    {
      nom: "Vive la physique",
      dateDeRendu: new Date('2023-03-05'),
      rendu: false
    },
    {
      nom: "Angular c'est encore mieux",
      dateDeRendu: new Date('2021-03-10'),
      rendu: false
    }];

  constructor() { }

  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments);
  }

  addAssignment(assignment: Assignment): Observable<String> {
    this.assignments.push(assignment);
    return of("Assignment ajouté");
  }

  updateAssignment(assignment: Assignment): Observable<String>{
    return of("Assignment service: Assignment modifié");
  }

  deleteAssignment(assignment: Assignment): Observable<String>{

    let index = this.assignments.indexOf(assignment);
    if(index > -1){
      this.assignments.splice(index, 1);
    }
    return of("Assignment service: Assignment supprimé");
  }
}
