import { Routes } from '@angular/router';
import { MasterLayoutComponent } from './layout/master-layout/master-layout.component';

export const routes: Routes = [
   {
    path: '',
    component: MasterLayoutComponent,
    loadChildren:() => import('./pages/pages.routes').then((c) => c.routes),
  },
];
