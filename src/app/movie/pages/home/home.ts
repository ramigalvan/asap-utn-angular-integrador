import { Component } from '@angular/core';
import { MovieGrid } from "../../components/movie-grid/movie-grid";

@Component({
  selector: 'app-home',
  imports: [MovieGrid],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
