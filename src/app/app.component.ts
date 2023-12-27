import { Component } from '@angular/core';

interface SideNavToggle {
  collapsed: boolean;
  screenWidth: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'assignement-app';
  opened: boolean = false;
  isSideNavCollapsed = false;
  screenWidth: number = 0;

  constructor() { }

  onToggleSideNav(data: SideNavToggle): void {
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }
}
