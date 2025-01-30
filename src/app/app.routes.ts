import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { StudentgradingformComponent } from './pages/studentgradingform/studentgradingform.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'studentgradingform',
        component: StudentgradingformComponent
    },
    { 
        path: 'studentgradingform/:id', 
        component: StudentgradingformComponent 
    },
    {
        path: 'header',
        component: HeaderComponent
    }
];
