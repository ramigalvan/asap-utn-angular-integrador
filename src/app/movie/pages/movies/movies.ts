import { Component } from '@angular/core';
import { MovieGrid } from "../../components/movie-grid/movie-grid";
import { Search } from "../../components/search/search";

@Component({
  selector: 'app-movies',
  imports: [MovieGrid, Search],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies {

}
