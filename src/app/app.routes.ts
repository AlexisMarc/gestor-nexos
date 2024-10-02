import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./core/modules/modules.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./archive/app.module').then((m) => m.AppModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
