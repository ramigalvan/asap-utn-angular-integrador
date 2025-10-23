import { Routes } from '@angular/router';
import { Home } from './movie/pages/home/home';
import { Movies } from './movie/pages/movies/movies';
import { TvShows } from './movie/pages/tv-shows/tv-shows';
import { Favorites } from './movie/pages/favorites/favorites';
import { MovieDetails } from './movie/pages/movie-details/movie-details';
import { TvShowDetails } from './movie/pages/tv-show-details/tv-show-details';
import { SandboxFree } from './movie/pages/sandbox/sandbox-free';

export const routes: Routes = [
    { path: '', component: Home, pathMatch: 'full' },
    { path: 'movies', component: Movies },
    { path: 'movies/:id', component: MovieDetails }, 
    { path: 'tv-shows', component: TvShows, },
    { path: 'tv-shows/:id', component: TvShowDetails },
    { path: 'favorites', component: Favorites },
    { path: 'sandbox', component: SandboxFree },
    { path: '**', redirectTo: '' }, // redirige si la ruta no existe
];
