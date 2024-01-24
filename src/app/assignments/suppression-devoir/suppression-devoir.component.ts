import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-suppression-devoir',
  templateUrl: './suppression-devoir.component.html',
  styleUrls: ['./suppression-devoir.component.scss'],
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
export class SuppressionDevoirComponent implements OnInit {

  assignments: any[] = [];

  constructor(private assignmentsService: AssignmentsService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.assignmentsService.getUniqueAssignments().subscribe(assignments => {
      console.log(assignments);
      this.assignments = assignments;
    });
  }

  onDelete(nom: String) {
    this.assignmentsService.deleteAssignmentUnique(nom)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/dashboard']);
      });
  }

  isAdmin() {
    return this.authService.isadmin;
  }

}
