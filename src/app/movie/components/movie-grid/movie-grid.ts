import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-grid',
  imports: [],
  templateUrl: './movie-grid.html',
  styleUrl: './movie-grid.css'
})
export class MovieGrid {

  movies = [
    { title: 'Pelicula 1' },
    { title: 'Pelicula 2' },
    { title: 'Pelicula 3' },
    { title: 'Pelicula 4' },
    { title: 'Pelicula 5' },
    { title: 'Pelicula 6' },
  ];
}
