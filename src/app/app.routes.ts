import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './archive/@pages/layouts/Nexos/Componentes/login/login.component'
      ).then((m) => m.LoginComponent),
  },
  // {
  //   path: 'new',
  //   loadChildren: () =>
  //     import('./core/modules/modules.routes').then((m) => m.routes),
  // },
  {
    path: 'home',
    loadChildren: () => import('./archive/app.module').then((m) => m.AppModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
