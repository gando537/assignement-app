import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignments.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';

@Component({
  selector: 'app-add-assignement',
  templateUrl: './add-assignement.component.html',
  styleUrls: ['./add-assignement.component.scss']
})
export class AddAssignementComponent {

  nomDevoir!: string;
  dateRendu!: Date;

  constructor(private assignmentsService: AssignmentsService) {
  }

  ngOnInit(): void {
  }


  onSubmit() {

    const newAssignment = new Assignment();
    newAssignment.id = this.assignmentsService.idCurrent;
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;

    // this.nouvelAssignment.emit(newAssignment);
    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(message => {
        console.log(message);
      });
  }

}
