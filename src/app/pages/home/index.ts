import { Routes } from '@angular/router';
import { FormClassComponent } from '@lib/components/form-class/form-class.component';
import { FormSchoolComponent } from '@lib/components/form-school/form-school.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: async () => (await import('./home.component')).HomeComponent,
  },
  {
    path: 'schools',
    title: 'Schools',
    component: FormSchoolComponent,
  },
  {
    path: 'classes',
    title: 'Classes',
    component: FormClassComponent,
  },
];
