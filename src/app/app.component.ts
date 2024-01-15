import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

interface SideNavToggle {
  collapsed: boolean;
  screenWidth: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'assignement-app';
  opened: boolean = false;
  isSideNavCollapsed = false;
  screenWidth: number = 0;

  constructor(private authService: AuthService) { }

  onToggleSideNav(data: SideNavToggle): void {
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWidth;
  }

  private checkAuthentication(): void {
    console.log('checkAuthentication');
    if (this.authService.getToken() || this.authService.isLoggedInOut()) {
      // L'utilisateur est toujours connecté, vous pouvez exécuter des actions supplémentaires ici
      console.log('Vous êtes toujours connecté');
      this.authService.relogUser();
    }
  }

  ngOnInit(): void {
    this.checkAuthentication();
  }
}
