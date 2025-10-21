import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieGrid } from "../../components/movie-grid/movie-grid";
import { Search } from "../../components/search/search";
import { TrendingItem } from '../../models/trending';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-movies',
  imports: [MovieGrid, Search],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies implements OnInit{
   movies = signal<TrendingItem[]>([])
  movieService = inject(MovieService)
  searchResults: TrendingItem[] = []

  ngOnInit(): void {
    this.movieService.getTrendingByAllWeek()
      .subscribe({
        next: (res) => (this.movies.set(res.results)),
        error: (err) => console.error(err),

      })
  }

  onSearch(query: TrendingItem[]): void {
    console.log(query);
    
    this.searchResults = query; 
  }
}
