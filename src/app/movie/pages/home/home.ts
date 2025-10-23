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
  searchResults: string = "";
  noSearchResults = signal<boolean>(false);
  searchQuery = signal<string>('');
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalResults = signal<number>(0);
  isSearching = signal<boolean>(false);
  
  ngOnInit(): void {
    this.loadTrendingByWeek()
  }

  loadTrendingByWeek(page: number = 1): void{
    this.isLoading.set(true);
    this.error.set(null);
    this.currentPage.set(page);

    const request$ = this.isSearching()
      ? this.movieService.searchItems(this.searchQuery(), 'movie', page)
      : this.movieService.getTrendingByAllWeek(page);

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
    this.searchQuery.set(query);
    this.isSearching.set(!!query);
    this.loadTrendingByWeek(1);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.loadTrendingByWeek(page);
    }
  }

  onNoResults(noResults: boolean): void {
    this.noSearchResults.set(noResults);
  }


}
