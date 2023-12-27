import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Assignment } from '../models/assignments.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Matiere } from '../models/matieres.model';
import { GestionMatieresService } from 'src/app/shared/services/gestion-matieres.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-assignement',
  templateUrl: './add-assignement.component.html',
  styleUrls: ['./add-assignement.component.scss']
})
export class AddAssignementComponent {

  nomDevoir!: string;
  dateRendu!: Date;
  matiere!: Matiere;
  matieres: Matiere[] = [];

  constructor(private assignmentsService: AssignmentsService,
              private authService: AuthService,
              private matiereService: GestionMatieresService) {
  }

  matiereControl = new FormControl<Matiere | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.matiereService.getMatieres()
      .subscribe(matieres => {
        this.matieres = matieres;
        console.log("Matieres récupérées avec succès !");
        console.log(this.matieres);
      });

  }

  onSubmit() {

    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;
    newAssignment.matiere.nom_matiere = this.matiere.nom_matiere;

    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(message => {
        console.log(message);
      });
  }

  islogged() {
    return this.authService.isLoggedIn;
  }
}
