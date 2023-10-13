import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignementsComponent } from './assignments/assignments.component';
import { AjoutDevoirComponent } from './ajout-devoir/ajout-devoir.component';
import { ModificationDevoirComponent } from './modification-devoir/modification-devoir.component';
import { SuppressionDevoirComponent } from './suppression-devoir/suppression-devoir.component';
import { GenerationDeDonneesDeTestsComponent } from './generation-de-donnees-de-tests/generation-de-donnees-de-tests.component';
import { ListeDesDevoirsComponent } from './liste-des-devoirs/liste-des-devoirs.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: AssignementsComponent},
  {path: 'liste-devoirs', component: ListeDesDevoirsComponent},
  {path: 'ajout-devoir', component: AjoutDevoirComponent},
  {path: 'modif-devoir', component: ModificationDevoirComponent},
  {path: 'suppr-devoir', component: SuppressionDevoirComponent},
  {path: 'generation-donnees', component: GenerationDeDonneesDeTestsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
