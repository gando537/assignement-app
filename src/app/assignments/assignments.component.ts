import { Component, OnInit, AfterViewInit, ElementRef, QueryList, ViewChildren} from '@angular/core';
import { Assignment } from './models/assignments.model';
import { AssignmentsService } from '../shared/services/assignments.service';
import { AuthService } from '../shared/services/auth.service';
import { PageEvent } from '@angular/material/paginator';
import { BooleanInput } from '@angular/cdk/coercion';
import { GestionElevesService } from '../shared/services/gestion-eleves.service';
import { GestionMatieresService } from '../shared/services/gestion-matieres.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UploadService } from '../shared/services/upload.service';

@Component({
  selector: 'app-assignements',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss'],
  animations: [
    trigger('cardAnimation', [
      state('void', style({
        opacity: 0
      })),
      state('*', style({
        opacity: 1
      })),
      transition('void => *', animate('3000ms ease-in')),
      transition('* => void', animate('3000ms ease-out'))
    ])
  ]
})
export class AssignementsComponent implements OnInit, AfterViewInit {

  page: number = 1;
  limit: number = 30;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  hasNextPage: boolean = false;
  prevPage: number = 0;
  nextPage: number = 0;
  url: string = '';

  assignments: Assignment[] = [];
  showFirstLastButtons: BooleanInput = true;

  constructor(public assignmentsService: AssignmentsService,
              public authService: AuthService,
              public gestionElevesService: GestionElevesService,
              public gestionMatieresService: GestionMatieresService) {
  }

  @ViewChildren('cards') cards!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.setCardHeights();
  }

  setCardHeights() {
    if (this.cards) {
      const cardHeights = this.cards.map(card => card.nativeElement.offsetHeight);
      const maxHeights = Math.max(...cardHeights);

      this.cards.forEach(card => {
        card.nativeElement.style.height = `${maxHeights}px`;
      });
    }
  }

  ngOnInit(): void {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
    .subscribe(data => {
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
      this.prevPage = data.prevPage;
      this.nextPage = data.nextPage;
      console.log("Assignments récupérés avec succès !");
    });
    // console.log(this.assignments);
    this.url = this.assignmentsService.url;
  }

  peuplerBD() {
    this.assignmentsService.peuplerBDAvecForkJoin().subscribe(() => {
      console.log("La BD a été peuplée, tous les appels à forkJoin sont terminés");
      window.location.reload();
    });
  }

  peuplerEleves() {
    this.gestionElevesService.peuplerCollectionEleve().subscribe(() => {
      console.log("La collection Eleves a été peuplée");
      window.location.reload();
    });
  }

  peuplerMatieres() {
    this.gestionMatieresService.peuplerCollectionMatiere().subscribe(() => {
      console.log("La collection Matieres a été peuplée");
      window.location.reload();
    });
  }

  getAssignments() {
    this.assignmentsService.getAssignments()
      .subscribe(assignments => {
        this.assignments = assignments;
      });
  }

  handlePageEvent($event: PageEvent) {
    this.page = $event.pageIndex + 1;
    this.limit = $event.pageSize;
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit)
      .subscribe(data => {
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        this.prevPage = data.prevPage;
        this.nextPage = data.nextPage;
        console.log("Assignments récupérés avec succès !");
      });
  }

  islogged() {
    return this.authService.isLoggedIn;
  }

}
