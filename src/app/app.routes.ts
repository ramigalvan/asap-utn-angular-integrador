import { Routes } from '@angular/router';
import { Home } from './movie/pages/home/home';
import { Movies } from './movie/pages/movies/movies';
import { TvShows } from './movie/pages/tv-shows/tv-shows';
import { Favorites } from './movie/pages/favorites/favorites';

export const routes: Routes = [
    { path: '', component: Home, pathMatch: 'full' },
    { path: 'movies', component: Movies },
    { path: 'tv-shows', component: TvShows },
    { path: 'favorites', component: Favorites },
    { path: '**', redirectTo: '' }, // redirige si la ruta no existe
];
