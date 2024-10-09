import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@guard';
import { RegisterComponent } from '@register';

export const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RegisterRouterModule {
  }