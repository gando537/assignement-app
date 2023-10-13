import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule} from '@angular/material/card';
import { AssignementsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { AssignementDetailComponent } from './assignments/assignement-detail/assignement-detail.component';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { AddAssignementComponent } from './assignments/add-assignement/add-assignement.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListeDesDevoirsComponent } from './liste-des-devoirs/liste-des-devoirs.component';
import { AjoutDevoirComponent } from './ajout-devoir/ajout-devoir.component';
import { ModificationDevoirComponent } from './modification-devoir/modification-devoir.component';
import { SuppressionDevoirComponent } from './suppression-devoir/suppression-devoir.component';
import { GenerationDeDonneesDeTestsComponent } from './generation-de-donnees-de-tests/generation-de-donnees-de-tests.component';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';

@NgModule({
  declarations: [
    AppComponent,
    AssignementsComponent,
    RenduDirective,
    AssignementDetailComponent,
    NonRenduDirective,
    AddAssignementComponent,
    SidenavComponent,
    DashboardComponent,
    ListeDesDevoirsComponent,
    AjoutDevoirComponent,
    ModificationDevoirComponent,
    SuppressionDevoirComponent,
    GenerationDeDonneesDeTestsComponent,
    BodyComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatLineModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCheckboxModule,
    OverlayModule,
    CdkMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
