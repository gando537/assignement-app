import { Injectable } from '@angular/core';
import { listUser } from './user-data';
import { userItems } from '../assignments/header/header-dummy-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  isadmin = false;
  username = '';
  listUser = listUser;
  userItems = userItems;
  usernameBrider = '';

  constructor() { }

  logIn(username: string) {
    this.isLoggedIn = true;
    userItems[3].label = 'Logout';
    this.username = username;
    this.usernameBrider = username.length > 3 ? username.substring(0, 3) + '...' : username;
    this.isadmin = this.listUser.find(user => user.login === username)!.role === 'admin';
  }

  logOut() {
    this.isLoggedIn = false;
    userItems[3].label = 'Login';
    this.username = '';
    this.usernameBrider = '';
    this.isadmin = false;
  }

  isAdmin() {

    const isUserAdmin = new Promise(
      (resolve, reject) => {
          resolve(this.isadmin);
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

  getUsers() {
    return this.listUser;
  }
}
