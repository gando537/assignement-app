import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignementsComponent } from '../assignments/assignments.component';
import { EditAssignmentComponent } from '../assignments/edit-assignment/edit-assignment.component';
import { SuppressionDevoirComponent } from '../assignments/suppression-devoir/suppression-devoir.component';
import { GenerationDeDonneesDeTestsComponent } from '../assignments/generation-de-donnees-de-tests/generation-de-donnees-de-tests.component';
import { ListeDesDevoirsComponent } from '../assignments/liste-des-devoirs/liste-des-devoirs.component';
import { AddAssignementComponent } from '../assignments/add-assignement/add-assignement.component';
import { AssignementDetailComponent } from '../assignments/assignement-detail/assignement-detail.component';
import { AuthGuard, AuthGuardUser } from '../shared/auth.guard';
import { ImageUploadComponent } from '../assignments/image-upload/image-upload.component';
import { DashboardComponent } from '../assignments/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'assignment/:id', component: AssignementDetailComponent, canActivate: [AuthGuardUser]},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'liste-devoirs', component: ListeDesDevoirsComponent},
  {path: 'ajout-devoir', component: AddAssignementComponent},
  {path: 'ajout-image', component: ImageUploadComponent},
  {path: 'assignment/:id/edit', component: EditAssignmentComponent, canActivate: [AuthGuardUser]},
  {path: 'edit-devoir', component: EditAssignmentComponent},
  {path: 'suppr-devoir', component: SuppressionDevoirComponent},
  {path: 'generation-donnees', component: GenerationDeDonneesDeTestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
