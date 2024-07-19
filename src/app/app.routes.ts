import { Routes } from '@angular/router';
import { authGuard } from '@lib/guards';

export const routes: Routes = [
    {
        path: '',
        loadChildren: async () => (await import('@pages/home')).routes,
        canMatch: [authGuard()],
    },
    {
        path: '**',
        loadComponent: async () => (await import('@pages/screens/not-found/not-found.component')).NotFoundComponent,
    },
];
