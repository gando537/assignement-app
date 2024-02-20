import { Component, OnInit, AfterViewInit, ElementRef, QueryList, ViewChildren, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Assignment } from '../models/assignments.model';
import { AssignmentsService } from '../../shared/services/assignments.service';
import { AuthService } from '../../shared/services/auth.service';
import { PageEvent } from '@angular/material/paginator';
import { BooleanInput } from '@angular/cdk/coercion';
import { GestionElevesService } from '../../shared/services/gestion-eleves.service';
import { GestionMatieresService } from '../../shared/services/gestion-matieres.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-liste-des-devoirs',
  templateUrl: './liste-des-devoirs.component.html',
  styleUrls: ['./liste-des-devoirs.component.scss'],
  animations: [
    trigger('cardAnimation', [
      state('void', style({
        opacity: 0
      })),
      state('*', style({
        opacity: 1
      })),
      transition('void => *', animate('2000ms ease-in')),
      transition('* => void', animate('2000ms ease-out'))
    ])
  ]
})
export class ListeDesDevoirsComponent implements OnInit, AfterViewInit {

  page: number = 1;
  limit: number = 30;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  hasNextPage: boolean = false;
  prevPage: number = 0;
  nextPage: number = 0;
  url: string = '';

  @Input() assignments: Assignment[] = [];
  showFirstLastButtons: BooleanInput = true;

  constructor(public assignmentsService: AssignmentsService,
    public authService: AuthService,
    public gestionElevesService: GestionElevesService,
    public gestionMatieresService: GestionMatieresService,
    private spinner: NgxSpinnerService) {
  }

  @ViewChildren('cards') cards!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.setCardHeights();
  }

  openSpinner() {
    this.spinner.show();
  }

  setCardHeights() {
    if (this.cards && this.cards.length > 0 && this.cards.first.nativeElement) {
      const cardHeights = this.cards.map(card => card.nativeElement.offsetHeight);
      const maxHeights = Math.max(...cardHeights);

      this.cards.forEach(card => {
        card.nativeElement.style.height = `${maxHeights}px`;
      });
    }
  }

  ngOnInit(): void {
    this.openSpinner();
    this.assignmentsService.currentAssignments.subscribe(assignments => {
      this.assignments = assignments;
      console.log("Assignments récupérés avec succès !");
      console.log(this.assignments);
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    });
    this.url = this.assignmentsService.url;
    this.loadInitialData();
  }

  loadInitialData() {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit) // ou vos valeurs par défaut de page et limit
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
        this.assignmentsService.changeAssignments(this.assignments);
        // Mettez à jour les informations de pagination ici
      });
  }

  getAssignments() {
    this.openSpinner();
    this.assignmentsService.getAssignments()
      .subscribe(assignments => {
        this.assignments = assignments;
        this.spinner.hide();
      });
  }

  handlePageEvent($event: PageEvent) {
    this.openSpinner();
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
        this.spinner.hide();
        console.log("Assignments récupérés avec succès !");
      });
  }

  islogged() {
    return this.authService.isLoggedIn;
  }
}
