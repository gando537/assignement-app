import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignments.model';

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


  assignments: Assignment[] = [
    {
      nom: 'Devoir Angular de Buffa',
      dateDeRendu: new Date('2023-09-30'),
      rendu: false,
    },
    {
      nom: 'Devoir SQL de Mopolo',
      dateDeRendu: new Date('2023-10-30'),
      rendu: false,
    },
    {
      nom: 'Devoir gestion de Tunsi',
      dateDeRendu: new Date('2023-08-30'),
      rendu: true,
    },
  ];

  ngOnInit(): void {
  }

  assignmentClique(assignement: Assignment) {
    this.assignmentSelectionne = assignement;
  }

  onNouvelAssignment($event: Assignment) {
    this.assignments.push($event);
    this.formVisible = false;
  }

  onSupprimeAssignement($event: Assignment) {
    this.assignments = this.assignments.filter(a => a !== $event);
    if (this.assignmentSelectionne === $event) {
      this.assignmentSelectionne = null as any;
    }
  }
}
