import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule} from '@angular/material/card';
import { AssignementsComponent } from '../assignments/assignments.component';
import { RenduDirective } from '../shared/directives/rendu.directive';
import { ImageUploadComponent } from '../assignments/image-upload/image-upload.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { AssignementDetailComponent } from '../assignments/assignement-detail/assignement-detail.component';
import { NonRenduDirective } from '../shared/directives/non-rendu.directive';
import { AddAssignementComponent } from '../assignments/add-assignement/add-assignement.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from '../assignments/sidenav/sidenav.component';
import { DashboardComponent } from '../assignments/dashboard/dashboard.component';
import { ListeDesDevoirsComponent } from '../assignments/liste-des-devoirs/liste-des-devoirs.component';
import { EditAssignmentComponent } from '../assignments/edit-assignment/edit-assignment.component';
import { SuppressionDevoirComponent } from '../assignments/suppression-devoir/suppression-devoir.component';
import { GenerationDeDonneesDeTestsComponent } from '../assignments/generation-de-donnees-de-tests/generation-de-donnees-de-tests.component';
import { BodyComponent } from '../assignments/body/body.component';
import { HeaderComponent } from '../assignments/header/header.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogViewComponent } from '../assignments/dialog-view/dialog-view.component';
import { DialogOverviewDialog } from '../assignments/dialog-view/dialog-view.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TopWidgetsComponent } from '../assignments/top-widgets/top-widgets.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule } from 'angular-highcharts';
import { MatRadioModule } from '@angular/material/radio';
import { StatsCurveComponent } from '../assignments/stats-curve/stats-curve.component';
import { StatsDiagramComponent } from '../assignments/stats-diagram/stats-diagram.component';
import { LastFewAssignmentsComponent } from '../assignments/last-few-assignments/last-few-assignments.component';
import { TopThreeAssignmentsComponent } from '../assignments/top-three-assignments/top-three-assignments.component';
import { DynamicFontSizeDirective } from '../shared/directives/dynamic-font-size.directive';

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
    DialogOverviewDialog,
    ImageUploadComponent,
    TopWidgetsComponent,
    StatsCurveComponent,
    StatsDiagramComponent,
    LastFewAssignmentsComponent,
    TopThreeAssignmentsComponent,
    DynamicFontSizeDirective
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
    ReactiveFormsModule,
    MatSelectModule,
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
    MatPaginatorModule,
    MatOptionModule,
    FontAwesomeModule,
    ChartModule,
    MatRadioModule,

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
