import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from './assignments.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { BooleanInput, NumberInput } from '@angular/cdk/coercion';

@Component({
  selector: 'app-assignements',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignementsComponent implements OnInit {

  page: number = 1;
  limit: number = 10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  hasNextPage: boolean = false;
  prevPage: number = 0;
  nextPage: number = 0;

  assignments: Assignment[] = [];
  showFirstLastButtons: BooleanInput = true;

  constructor(public assignmentsService: AssignmentsService) {
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
  }

  peuplerBD() {
    this.assignmentsService.peuplerBDAvecForkJoin().subscribe(() => {
      console.log("La BD a été peuplée, tous les appels à forkJoin sont terminés");
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
}
