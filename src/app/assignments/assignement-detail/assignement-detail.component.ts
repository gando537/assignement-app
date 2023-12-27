import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from '../models/assignments.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-assignement-detail',
  templateUrl: './assignement-detail.component.html',
  styleUrls: ['./assignement-detail.component.scss']
})
export class AssignementDetailComponent implements OnInit {

  assignmentTransmis: Assignment | undefined;

  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  onDelete() {
    // this.supprimeAssignment.emit(this.assignmentTransmis);
    if (this.assignmentTransmis) {
      this.assignmentsService.deleteAssignment(this.assignmentTransmis)
        .subscribe(message => {
          console.log(message);
          this.router.navigate(['/dashboard']);
        });
    }
  }

  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;
      this.assignmentsService.updateAssignment(this.assignmentTransmis)
        .subscribe(message => {
          console.log(message);
          this.router.navigate(['/dashboard']);
        });
    }
  }

  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
      .subscribe(a => this.assignmentTransmis = a);
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis?.id, 'edit'], {
      queryParams: {
        nom: this.assignmentTransmis?.nom
      },
      fragment: 'edition'
    });
  }

  isAdmin() {
    return this.authService.isadmin;
  }

  isLogged() {
    return this.authService.isLoggedIn;
  }
}
