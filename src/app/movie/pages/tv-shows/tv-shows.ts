import { Component } from '@angular/core';
import { Search } from "../../components/search/search";
import { MovieGrid } from "../../components/movie-grid/movie-grid";

@Component({
  selector: 'app-tv-shows',
  imports: [Search, MovieGrid],
  templateUrl: './tv-shows.html',
  styleUrl: './tv-shows.css'
})
export class TvShows {

}
