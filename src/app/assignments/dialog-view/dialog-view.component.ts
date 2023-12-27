import {Component, Inject, NgZone } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../models/users.model';
import { timeout } from 'rxjs';

export interface DialogData {
  name: string;
  password: string;
  email: string;
}

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.scss']
})
export class DialogViewComponent {

  name!: string;
  email!: string;
  password!: string;
  showPassword = false;

  constructor(public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              public dialogRef: MatDialogRef<DialogOverviewDialog>,
              private authService: AuthService) {}

  openDialog(signUp: boolean): void {
    if (signUp) {
      this.dialogRef.close();
    }
    const dialogRef = this.dialog.open(DialogOverviewDialog, {
      width: '300px',
      data: {login: this.name, password: this.password, email: this.email}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSignInClick(): void {
    const user = new User();
    user.name = this.data.name;
    user.email = this.data.email!;
    while(!this.checkEmail()) {

    }
    user.password = this.data.password!;
    this.authService.addUser(user).subscribe(data => console.log(data));
    this.dialogRef.close();
  }

  checkEmail(): boolean {
    return this.data.email!.includes('@');
  }


}

@Component({
  selector: 'dialog-overview-dialog',
  templateUrl: 'dialog-overview-dialog.html',
  styleUrls: ['./dialog-view.component.scss']
})
export class DialogOverviewDialog {

  invalidLogin: boolean = false;
  showPassword = false;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialog: MatDialog,
    public authService: AuthService,
    private ngZone: NgZone) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onYesClick(): void {
    const user = new User();
    user.email = this.data.email!;
    user.password = this.data.password!;
    this.authService.login(user).subscribe(data => {
      if(data.auth) {
        this.authService.setLogIn(data);
        this.invalidLogin = false;
        this.dialogRef.close();
      }
    });
    setTimeout(() => {
      this.ngZone.run(() => {
        if (!this.authService.isLoggedIn) {
          this.invalidLogin = true;
        }
        console.log("Timeout terminé !");
      });
    }, 300);
  }

  onOpenRegister(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(DialogViewComponent, {
      width: '300px',
      data: {login: this.data.name, password: this.data.password, email: this.data.email}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
