import { Routes } from '@angular/router';
import { UploadComponent } from './pages/upload/upload';
import { Guia } from './pages/guia/guia';

export const routes: Routes = [
  {
    path: '',
    component: UploadComponent,
  },
  {
    path: 'guia',
    component: Guia,
  },
];
