import { Component, OnInit } from '@angular/core';
import { Assignment } from '../models/assignments.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';

@Component({
  selector: 'app-last-few-assignments',
  templateUrl: './last-few-assignments.component.html',
  styleUrls: ['./last-few-assignments.component.scss']
})
export class LastFewAssignmentsComponent implements OnInit {

  data: any[] = [];
  assignments: Assignment[] | undefined;
  transactions: any[] = [];
  selectedValue: string = 'rendu';
  title: string = 'Devoirs rendus';

  constructor(private assignmentsService: AssignmentsService) { }

  ngOnInit(): void {
    this.assignmentsService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments.docs;
      this.updateTransactions();
    });
  }

  onRadioChange() {
    this.updateTransactions();
  }

  private updateTransactions(): void {
    this.data = this.assignmentsService.getAssignmentsByStatus(this.assignments);
    let data = this.selectedValue === 'rendu' ? this.data.filter((value, index) => value[5] === true) : this.data.filter((value, index) => value[5] === false);
    this.transactions = data.map((value, index) => ({
      img: value[0],
      date: value[1],
      name: value[2],
      author: value[3],
      matiere: value[4],
      status: value[5],
      note: value[6]
    }));
    this.title = this.selectedValue === 'rendu' ? 'Devoirs rendus' : 'Devoirs non rendus';
  }
}
