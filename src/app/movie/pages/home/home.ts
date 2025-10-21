import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieGrid } from "../../components/movie-grid/movie-grid";
import { Search } from "../../components/search/search";
import {  MovieService } from '../../services/movie-service';
import { TrendingItem } from '../../models/trending';

@Component({
  selector: 'app-home',
  imports: [MovieGrid, Search],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  movies = signal<TrendingItem[]>([]);
  movieService = inject(MovieService);
  searchResults: TrendingItem[] = [];
  noSearchResults = signal<boolean>(false);
  searchQuery = signal<string>('');

  ngOnInit(): void {
    this.movieService.getTrendingByAllWeek()
      .subscribe({
        next: (res) => (this.movies.set(res.results)),
        error: (err) => console.error(err),

      })
  }

  onSearch(query: TrendingItem[]): void {
    this.searchResults = query;
  }

  onNoResults(noResults: boolean): void {
    this.noSearchResults.set(noResults);
  }


}
