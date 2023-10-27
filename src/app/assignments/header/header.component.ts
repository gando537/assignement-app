import { Component, HostListener, Input, OnInit } from '@angular/core';
import { languages, notifications, userItems } from './header-dummy-data';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { DialogViewComponent } from '../dialog-view/dialog-view.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() collapsed: boolean = false;
  @Input() screenWidth: number = 0;

  canShowSearchAsOverlay: boolean = false;
  selectedLanguage: any;

  languages = languages;
  notifications = notifications;
  userItems = userItems;
  username = '';

  constructor(public authService: AuthService,
              private router: Router,
              private dialogView: DialogViewComponent) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;
    this.checkCanShowSearchAsOverlay(this.screenWidth);
  }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.selectedLanguage = this.languages[0];
  }

  getHeadClass(): string {
    let styleClass = '';

    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    }else{
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }

  checkCanShowSearchAsOverlay(innerWidth: number): void {
    if(innerWidth < 845){
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }

  loggInOrOut(label:string): void {
    if(label !== 'Login' && label !== 'Logout')
      return;
    if(this.authService.isLoggedIn){
      this.authService.logOut();
      this.router.navigate(['/dashboard']);
    } else {
      this.dialogView.openDialog();
    }
  }

}
