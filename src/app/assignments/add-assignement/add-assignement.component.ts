import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignments.model';

@Component({
  selector: 'app-add-assignement',
  templateUrl: './add-assignement.component.html',
  styleUrls: ['./add-assignement.component.scss']
})
export class AddAssignementComponent {

  nomDevoir!: string;
  dateRendu!: Date;

  constructor() {
  }

  ngOnInit(): void {
  }

  @Output()
  nouvelAssignment = new EventEmitter<Assignment>();

  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;

    this.nouvelAssignment.emit(newAssignment);
  }

}
