import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'School',
    loadComponent: async () => (await import('./form-school.component')).FormSchoolComponent,
  },
];
