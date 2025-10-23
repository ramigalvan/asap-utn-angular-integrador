import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TopNav } from './movie/components/top-nav/top-nav';
import { MovieGrid } from './movie/components/movie-grid/movie-grid';
import { Search } from "./movie/components/search/search";
import { FooterInfo } from "./movie/components/footer-info/footer-info";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, TopNav, FooterInfo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('asap-utn-angular-integrador');

}
