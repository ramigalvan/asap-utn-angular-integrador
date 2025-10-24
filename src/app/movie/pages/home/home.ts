import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieGrid } from "../../components/movie-grid/movie-grid";
import { Search, SearchResult } from "../../components/search/search";
import { MovieService } from '../../services/movie-service';
import { TrendingItem } from '../../models/trending';
import { MovieSearchList } from '../../components/movie-search-list/movie-search-list';

@Component({
  selector: 'app-home',
  imports: [MovieGrid, Search, MovieSearchList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  movies = signal<TrendingItem[]>([]);
  movieService = inject(MovieService);
  searchResults = signal<SearchResult[]>([]);
  noSearchResults = signal<boolean>(false);
  searchQuery = signal<string>('');
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalResults = signal<number>(0);
  isSearching = signal<boolean>(false);
  showSearchResults = signal<boolean>(false);

  ngOnInit(): void {
    this.loadTrendingByWeek()
  }

  loadTrendingByWeek(page: number = 1): void {
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
    if (!query) {
      this.clearSearch();
    } else {
      this.showSearchResults.set(false);
      this.loadTrendingByWeek(1);
    }
  }

  onSearchByEnter(response: any): void { 
    this.searchQuery.set(response.query);
    this.searchResults.set(response.results);
    this.showSearchResults.set(true); 
    this.isSearching.set(true);
    this.currentPage.set(response.page);
    this.totalPages.set(response.total_pages);
    this.totalResults.set(response.total_results);
  }

  onSearchCleared(): void {
    this.clearSearch();
  }

  private clearSearch(): void {
    this.searchQuery.set('');
    this.searchResults.set([]);
    this.showSearchResults.set(false); // Vuelve al modo Trending
    this.isSearching.set(false);
    this.loadTrendingByWeek(1); // Vuelve a cargar la página 1 de trending
  }

  // Método de paginación unificado
  onPageChange(page: number): void {
    const totalPages = this.totalPages();
    if (page >= 1 && page <= totalPages && page !== this.currentPage()) {

      if (this.showSearchResults()) {
        // Si estamos en la vista de búsqueda, llama a la función de búsqueda
        this.loadSearchResults(page);
      } else {
        // Si estamos en la vista Trending, llama a la función Trending
        this.loadTrendingByWeek(page);
      }
    }
  }

  onNoResults(noResults: boolean): void {
    this.noSearchResults.set(noResults);
  }
  loadSearchResults(page: number = 1): void {
    const query = this.searchQuery();
    if (!query) return;

    this.isLoading.set(true);
    this.error.set(null);
    this.currentPage.set(page);

    this.movieService.searchMulti(query, page).subscribe({
      next: (response: any) => {
        // Aseguramos que solo sean movies o tv
        const filteredResults = response.results.filter(
          (item : any) => item.media_type === 'movie' || item.media_type === 'tv'
        );

        this.searchResults.set(filteredResults);
        this.totalPages.set(response.total_pages);
        this.totalResults.set(response.total_results);
        this.isLoading.set(false);
        window.scrollTo(0, 0);
      },
      error: (err) => {
        console.error('Error loading search results:', err);
        this.error.set('Failed to load search results. Please try again later.');
        this.isLoading.set(false);
        this.searchResults.set([]);
      }
    });
  }

}
