import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignments.model';

@Component({
  selector: 'app-assignement-detail',
  templateUrl: './assignement-detail.component.html',
  styleUrls: ['./assignement-detail.component.css']
})
export class AssignementDetailComponent implements OnInit {

  @Input()
  assignmentTransmis!: Assignment;

  @Output()
  supprimeAssignment = new EventEmitter<Assignment>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.supprimeAssignment.emit(this.assignmentTransmis);
  }

  onAssignmentRendu() {
    this.assignmentTransmis.rendu = true;
  }
}
