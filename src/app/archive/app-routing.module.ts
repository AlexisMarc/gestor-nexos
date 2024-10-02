import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';

@NgModule({
  imports: [RouterModule.forChild(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
