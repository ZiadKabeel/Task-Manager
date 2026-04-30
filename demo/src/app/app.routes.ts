import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login

    },
    {
        path: 'signup',
        component: Signup
    },
    {
        path: 'add',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./components/inputComponent/input').then((m) => m.input)
    },
    {
        path: 'Home',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./components/home/home').then((m) => m.Home)
    },
    {
        path: 'lists',
        canActivate: [authGuard], 
        loadComponent: () =>
            import('./components/tasklistComponent/tasklist').then((m) => m.tasklist)
    }

];
