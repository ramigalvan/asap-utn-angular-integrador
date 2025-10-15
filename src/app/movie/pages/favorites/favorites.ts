import { Component } from '@angular/core';
import { MovieGrid } from "../../components/movie-grid/movie-grid";

@Component({
  selector: 'app-favorites',
  imports: [MovieGrid],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites {

}
