import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent
  },
  {
    path:'candidates',
    component:DisplayComponent
  },
  {
    path:'candidates/edit/:id',
    component:EditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
