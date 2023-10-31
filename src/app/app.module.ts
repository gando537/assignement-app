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
import { SidenavComponent } from './assignments/sidenav/sidenav.component';
import { DashboardComponent } from './assignments/dashboard/dashboard.component';
import { ListeDesDevoirsComponent } from './assignments/liste-des-devoirs/liste-des-devoirs.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { SuppressionDevoirComponent } from './assignments/suppression-devoir/suppression-devoir.component';
import { GenerationDeDonneesDeTestsComponent } from './assignments/generation-de-donnees-de-tests/generation-de-donnees-de-tests.component';
import { BodyComponent } from './assignments/body/body.component';
import { HeaderComponent } from './assignments/header/header.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogViewComponent } from './assignments/dialog-view/dialog-view.component';
import { DialogOverviewDialog } from './assignments/dialog-view/dialog-view.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';


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
    EditAssignmentComponent,
    SuppressionDevoirComponent,
    GenerationDeDonneesDeTestsComponent,
    BodyComponent,
    HeaderComponent,
    DialogViewComponent,
    DialogOverviewDialog
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
    CdkMenuModule,
    MatSlideToggleModule,
    MatDialogModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  },
  {
    provide: MAT_DIALOG_DATA,
    useValue: {}
  },
  DialogOverviewDialog, DialogViewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
