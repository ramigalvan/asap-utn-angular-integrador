import { Component, inject, OnInit, signal } from '@angular/core';
import { Search } from "../../components/search/search";
import { MovieGrid } from "../../components/movie-grid/movie-grid";
import { TrendingItem } from '../../models/trending';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-tv-shows',
  imports: [Search, MovieGrid],
  templateUrl: './tv-shows.html',
  styleUrl: './tv-shows.css'
})
export class TvShows implements OnInit {
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

  onSearch($event: TrendingItem[]) {
    throw new Error('Method not implemented.');
  }

}
