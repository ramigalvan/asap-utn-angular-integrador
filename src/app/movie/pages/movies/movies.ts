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
export class Movies implements OnInit {
  movies = signal<TrendingItem[]>([]);
  searchResults = signal<TrendingItem[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalResults = signal<number>(0);
  isSearching = signal<boolean>(false);
  searchQuery = ''

  private movieService = inject(MovieService);

  ngOnInit(): void {

    this.loadMovies();
  }

  loadMovies(page: number = 1): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.currentPage.set(page);

    const request$ = this.isSearching()
      ? this.movieService.searchItems(this.searchQuery, 'movie', page)
      : this.movieService.getPopularMovies(page);

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
        this.error.set('Failed to load movies. Please try again later.');
        this.isLoading.set(false);
      }
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.isSearching.set(!!query);
    this.loadMovies(1);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.loadMovies(page);
    }
  }
}
