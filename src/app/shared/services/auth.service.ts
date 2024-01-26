import { Injectable } from '@angular/core';
import { listUser } from '../datas/user-data';
import { userItems } from '../../assignments/header/header-dummy-data';
import { User } from '../../assignments/models/users.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

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
  data: any;

  url = 'https://api-assignment-sigma.vercel.app/api/db-angular-project/users';

  private HttpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  private tokenKey = 'token';
  private userKey = 'user';

  saveToken(token: string): void {
    console.log('saveToken called : ' + token);
    localStorage.setItem(this.tokenKey, token);
  }

  saveUser(user: any): void {
    console.log('saveUser called : ' + user);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  constructor(private http: HttpClient) { }

  setLogIn(data: any) {
    this.data = data;
    this.isLoggedIn = true;
    userItems[3].label = 'Logout';
    this.username = data.username;
    this.usernameBrider = data.username.length > 3 ? data.username.substring(0, 3) + '...' : data.username;
    this.isadmin = data.role === 'admin' ? true : false;
    this.saveToken(data.token);
    this.saveUser(data);
  }

  relogUser() {
    if (localStorage.getItem('user') === null || this.isLoggedInOut() === false) {
      return;
    }
    this.data = JSON.parse(localStorage.getItem('user') || '{}');
    this.isLoggedIn = true;
    userItems[3].label = 'Logout';
    this.username = this.data.username;
    this.usernameBrider = this.data.username.length > 3 ? this.data.username.substring(0, 3) + '...' : this.data.username;
    this.isadmin = this.data.role === 'admin' ? true : false;
  }

  logOut() {
    this.isLoggedIn = false;
    userItems[3].label = 'Login';
    this.username = '';
    this.usernameBrider = '';
    this.isadmin = false;
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
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
          this.isLoggedIn = this.getToken() !== null;
          resolve(this.isLoggedIn);
      });
    return isUserLogged;
  }

  getUsers() {
    return this.http.get<User[]>(this.url+'/all');
  }

  addUser(user: User): Observable<any> {
    const body = new URLSearchParams();
    body.set('name', user.name);
    body.set('password', user.password);
    body.set('email', user.email);
    if (user.name === 'Gan2'){
      body.set('role', 'admin');
    }
    let bodyData: String;
    bodyData = body.toString();
    return this.http.post<String>(this.url+"/register", bodyData, this.HttpOptions);
  }

  login(user: User): Observable<any> {
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('password', user.password);
    let bodyData: String;
    bodyData = body.toString();
    return this.http.post<String>(this.url+"/login", bodyData, this.HttpOptions);
  }

  deleteUser(user: User): Observable<String> {
    return this.http.delete<String>(this.url + '/' + user._id);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<User>(this.url, user);
  }

  getUser(name: string): Observable<User | undefined> {
    return this.http.get<User>(this.url + '/' + name);
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded: any = jwtDecode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken()!;
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date!.valueOf() > new Date().valueOf());
  }

  isLoggedInOut(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }
}


