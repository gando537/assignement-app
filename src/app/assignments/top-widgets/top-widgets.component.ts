import { Component, OnInit } from '@angular/core';
import {
  faBookOpen,
  faBookOpenReader,
  faUserGraduate,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { Assignment } from '../models/assignments.model';
import { GestionElevesService } from 'src/app/shared/services/gestion-eleves.service';
import { GestionMatieresService } from 'src/app/shared/services/gestion-matieres.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.scss']
})
export class TopWidgetsComponent implements OnInit {

  assignments: Assignment[] | undefined;
  eleves: any[] | undefined;
  nbEleves: number = 0;
  matieres: any[] | undefined;
  nbMatieres: number = 0;
  nbAssignments: number = 0;
  users: any[] | undefined;
  nbUsers: number = 0;
  faBookOpen = faBookOpen;
  faBookOpenReader = faBookOpenReader;
  faUserGraduate = faUserGraduate;
  faUserTie = faUserTie;

  constructor(private assignmentsService: AssignmentsService,
              private elevesServices: GestionElevesService,
              private matieresServices: GestionMatieresService,
              private usersServices: AuthService) { }

  ngOnInit(): void {
    this.assignmentsService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments;
      this.nbAssignments = assignments.totalDocs;
    });
    this.elevesServices.getEleves().subscribe((eleves) => {
      this.eleves = eleves;
      this.nbEleves = eleves.length;
    });
    this.matieresServices.getMatieres().subscribe((matieres) => {
      this.matieres = matieres;
      this.nbMatieres = matieres.length;
    });
    this.usersServices.getUsers().subscribe((users) => {
      this.users = users;
      this.nbUsers = users.length;
    });
  }

  getNbAssignments(): number {
    return this.assignments?.length || 0;
  }
}
