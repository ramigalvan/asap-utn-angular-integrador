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
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalResults = signal<number>(0);
  isSearching = signal<boolean>(false);
  searchQuery = ''

  ngOnInit(): void {
    this.loadTvShows()
  }

   loadTvShows(page: number = 1): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.currentPage.set(page);

    const request$ = this.isSearching()
      ? this.movieService.searchItems(this.searchQuery, 'tv', page)
      : this.movieService.getPopularTvShows(page);

    request$.subscribe({
      next: (response) => {
        this.movies.set(response.results);
        this.totalPages.set(response.total_pages);
        this.totalResults.set(response.total_results);
        this.isLoading.set(false);
        window.scrollTo(0, 0);
      },
      error: (err) => {
        console.error('Error loading movies:', err);
        this.error.set('Failed to load tv shows. Please try again later.');
        this.isLoading.set(false);
      }
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.isSearching.set(!!query);
    this.loadTvShows(1);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.loadTvShows(page);
    }
  }

}
