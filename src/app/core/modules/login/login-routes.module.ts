import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { verifyAuthGuard } from '@guard';
import {
  FormLoginComponent,
  LoginComponent,
  RecoveryLoginComponent,
} from '@login';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [verifyAuthGuard],
    children: [
      {
        path: '',
        component: FormLoginComponent,
      },
      {
        path: 'recovery',
        component: RecoveryLoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRouterModule {}
