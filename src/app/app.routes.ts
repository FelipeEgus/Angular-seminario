import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Detail } from './pages/detail/detail';
import { Favorites } from './pages/favorites/favorites';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'pokemon/:id',
    component: Detail
  },
  {
    path: 'favorites',
    component: Favorites
  },
];