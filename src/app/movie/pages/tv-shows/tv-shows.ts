import { Component, inject, OnInit, signal } from '@angular/core';
import { Search } from "../../components/search/search";
import { MovieGrid } from "../../components/movie-grid/movie-grid";
import { TrendingItem } from '../../models/trending';
import { MovieService } from '../../services/movie-service';
import { MovieSearchList } from '../../components/movie-search-list/movie-search-list';

@Component({
  selector: 'app-tv-shows',
  imports: [Search, MovieGrid, MovieSearchList],
  templateUrl: './tv-shows.html',
  styleUrl: './tv-shows.css'
})
export class TvShows implements OnInit {
  movies = signal<TrendingItem[]>([])
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalResults = signal<number>(0);
  isSearching = signal<boolean>(false);
  searchQuery = signal<string>('')
  showSearchResults = signal<boolean>(false);
  searchResults = signal<TrendingItem[]>([]);

  movieService = inject(MovieService)
  
  ngOnInit(): void {
    this.loadTvShows()
  }

   loadTvShows(page: number = 1): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.currentPage.set(page);
    this.isSearching.set(false); // Siempre es falso al cargar popular

  
    this.movieService.getPopularTvShows(page).subscribe({
      next: (response) => {
        this.movies.set(response.results);
        this.totalPages.set(response.total_pages);
        this.totalResults.set(response.total_results);
        this.isLoading.set(false);
        window.scrollTo(0, 0);
      },
      error: (err) => {
        console.error('Error loading tv shows:', err);
        this.error.set('Failed to load tv shows . Please try again later.');
        this.isLoading.set(false);
      }
    });
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
    this.isSearching.set(!!query);
    this.loadTvShows(1);
  }

 

  // 1. Maneja la selección del item en el dropdown (solo lleva a detalles)
  onItemSelected(item: any): void {
    // La navegación ya está en el componente Search.
    // Aquí solo limpiamos la búsqueda para volver a la lista popular, si se desea.
    this.clearSearch();
  }

   // 2. Maneja la búsqueda al presionar ENTER (muestra la lista de resultados)
  onSearchByEnter(response: any): void {
    this.searchQuery.set(response.query);
    // Nota: searchMulti puede devolver TV o Movie, por eso usamos SearchResult[]
    this.searchResults.set(response.results);
    this.showSearchResults.set(true); // Cambia la vista a la lista de búsqueda
    this.isSearching.set(true);
    this.currentPage.set(response.page);
    this.totalPages.set(response.total_pages);
    this.totalResults.set(response.total_results);
    window.scrollTo(0, 0);
  }

  // 3. Maneja el borrado de la búsqueda
  onSearchCleared(): void {
    this.clearSearch();
  }


  private clearSearch(): void {
    this.searchQuery.set('');
    this.searchResults.set([]);
    this.showSearchResults.set(false); // Vuelve a la grilla de populares
    this.isSearching.set(false);
    this.loadTvShows(1); // Recarga la página 1 de populares
  }


   // 4. Paginación unificada
  onPageChange(page: number): void {
    const totalPages = this.totalPages();
    if (page >= 1 && page <= totalPages && page !== this.currentPage()) {
      if (this.showSearchResults()) {
        // Si estamos en la vista de búsqueda, volvemos a buscar
        this.loadSearchResults(page);
      } else {
        // Si estamos en la vista Popular, cargamos la siguiente página popular
        this.loadTvShows(page);
      }
    }
  }

  // 5. Método para cargar la búsqueda por página (para paginación en resultados)
  loadSearchResults(page: number = 1): void {
    const query = this.searchQuery();
    if (!query) return;

    this.isLoading.set(true);
    this.error.set(null);
    this.currentPage.set(page);

    // Usamos searchMulti para películas y series, pero el filtro 'movie' en el componente Search debería manejarlo.
    // Aquí usamos searchMulti para replicar la lógica de Home y manejar la paginación.
    this.movieService.searchMulti(query, page).subscribe({
      next: (response: any) => {
        const filteredResults = response.results.filter(
          (item: any) => item.media_type === 'movie' // Solo mostrar películas
        );
        this.searchResults.set(filteredResults);
        this.totalPages.set(response.total_pages);
        this.totalResults.set(response.total_results);
        this.isLoading.set(false);
        window.scrollTo(0, 0);
      },
      error: (err) => {
        console.error('Error loading search results:', err);
        this.error.set('Failed to load search results.');
        this.isLoading.set(false);
        this.searchResults.set([]);
      }
    });
  }

 


}
