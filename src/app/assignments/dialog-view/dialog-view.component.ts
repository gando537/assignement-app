import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth.service';

export interface DialogData {
  login: string;
  password: string;
}

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.scss']
})
export class DialogViewComponent {

  login: string | undefined;
  password: string | undefined;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewDialog, {
      width: '250px',
      data: {name: this.password, animal: this.login}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.login = result;
    });
  }

}

@Component({
  selector: 'dialog-overview-dialog',
  templateUrl: 'dialog-overview-dialog.html',
})
export class DialogOverviewDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public users: AuthService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    if(this.users.listUser.find(user => user.login === this.data.login && user.password === this.data.password)) {
      this.users.logIn(this.data.login);
      this.dialogRef.close();
    } else {
      alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
  }

}