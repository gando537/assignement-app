import { Injectable } from '@angular/core';
import { listUser } from './user-data';
import { DialogViewComponent } from '../assignments/dialog-view/dialog-view.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  listUser = listUser;

  constructor(private dialogView: DialogViewComponent) { }

  logIn() {
    // this.isLoggedIn = true;
    this.dialogView.openDialog();
  }

  logOut() {
    this.isLoggedIn = false;
  }

  isAdmin() {
    const isUserAdmin = new Promise(
      (resolve, reject) => {
          resolve(this.isLoggedIn);
      });
    return isUserAdmin;
  }

  isLogged() {
    const isUserLogged = new Promise(
      (resolve, reject) => {
          resolve(this.isLoggedIn);
      });
    return isUserLogged;
  }

  getUser() {
    const getUser = new Promise(
      (resolve, reject) => {
          resolve(this.listUser);
      });
    return getUser;
  }
}
