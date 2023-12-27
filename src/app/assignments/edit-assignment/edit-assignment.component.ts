import { Component, OnInit } from '@angular/core';
import { Assignment } from '../models/assignments.model';
import { AssignmentsService } from '../../shared/services/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.scss']
})
export class EditAssignmentComponent implements OnInit {

  assignment!: Assignment | undefined;
  nouveauNomAssignment!: string;
  ancienNomAssignment!: string;
  dateDeRendu!: Date;

  constructor(
    private assignmentService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    if (!id) {
      return;
    }
    this.assignmentService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) {
        return;
      }
      this.assignment = assignment;
      this.nouveauNomAssignment = assignment.nom;
      this.ancienNomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
    });
  }

  onSaveAssignment() {
    if (!this.ancienNomAssignment) {
      return;
    }
    this.assignment = this.assignment ? this.assignment : new Assignment();
    this.assignment.nom = this.nouveauNomAssignment ? this.nouveauNomAssignment : this.ancienNomAssignment;

    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }
    this.assignment._id = this.assignment._id ? this.assignment._id : this.ancienNomAssignment;

    this.assignmentService.updateAssignment(this.assignment).subscribe((message) => {
      console.log(message);
      this.router.navigate(['/dashboard']);
    });
  }
}
