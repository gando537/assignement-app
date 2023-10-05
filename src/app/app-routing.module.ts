import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignementsComponent } from './assignments/assignments.component';

const routes: Routes = [
  {
    path: "assignments", component: AssignementsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
