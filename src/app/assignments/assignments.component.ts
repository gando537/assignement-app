import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignments.model';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignements',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignementsComponent implements OnInit {

  formVisible: boolean = false;

  titre = 'Mon premier assignement'
  nomDevoir: string = '';
  dateRendu!: Date;
  assignmentSelectionne!: Assignment;
  assignments: Assignment[] = [];

  constructor(private assignmentsService: AssignmentsService) {
   }

  ngOnInit(): void {
    // this.assignments = this.assignmentsService.getAssignments();
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentsService.getAssignments()
      .subscribe(assignments => {
        this.assignments = assignments;
      });
  }

  assignmentClique(assignement: Assignment) {
    this.assignmentSelectionne = assignement;
  }

  onNouvelAssignment(event: Assignment) {
    // this.assignments.push($event);
    this.assignmentsService.addAssignment(event)
      .subscribe(message => {
        console.log(message);
      });
    this.formVisible = false;
  }

  onSupprimeAssignement($event: Assignment) {
    this.assignmentsService.deleteAssignment($event)
      .subscribe(message => {
        console.log(message);
      });
    if (this.assignmentSelectionne === $event) {
      this.assignmentSelectionne = null as any;
    }
  }
}
