import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.routes').then((m) => m.reactiveRoutes), //el then se utiliza porque el import es asincrono no se exporto el modulo por defecto
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes').then((m) => m.countryRoutes),
  },
  {
    path: '**',
    redirectTo: 'reactive',
  }

];
