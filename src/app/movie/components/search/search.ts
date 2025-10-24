import { Component, EventEmitter, Input, Output, OnDestroy, OnInit, ViewChild, ElementRef, HostListener, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie-service';
import { CommonModule, DatePipe } from '@angular/common';
import { Subject, distinctUntilChanged, Subscription, switchMap, of } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  media_type: 'movie' | 'tv';
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
}

interface SearchResponse {
  results: SearchResult[];
  page: number;
  total_pages: number;
  total_results: number;
  query: string; // Para mantener el contexto de la búsqueda
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './search.html',
  styleUrl: './search.css',
  providers: [DatePipe]
})
export class Search implements OnInit, OnDestroy {
  @Input() searchType: 'all' | 'movie' | 'tv' = 'all';
  @Output() itemSelected = new EventEmitter<SearchResult>();
  @ViewChild('searchContainer') searchContainer!: ElementRef;
  @HostListener('document:click', ['$event'])
  @Output() searchByEnter = new EventEmitter<SearchResponse>();
  query: string = '';
  searchResults: SearchResult[] = [];
  showResults = signal(false);
  isLoading = signal(false);



  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (!query.trim()) {
          return of({ results: [] });
        }
        this.isLoading.set(true);
        return this.movieService.searchMulti(query).pipe(
          map(response => {
            return {
              results: response.results.map(item => ({
                ...item,
                title: item.title || item.name,
                release_date: item.release_date || item.first_air_date
              }))
            };
          })
        ).pipe(
          map(response => response),
          map(response => {
            this.isLoading.set(false);
            return response;
          })
        );
      })
    ).subscribe({
      next: (response) => {
        this.searchResults = response.results;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.isLoading.set(false);
        this.searchResults = [];
      }
    });
  }

  @Output() searchCleared = new EventEmitter<void>();

  onSearchInput(): void {
    const query = this.query.trim();
    if (query) {
      this.searchSubject.next(query);
      this.showResults.set(true);
    } else {
      this.searchResults = [];
      this.showResults.set(false);
      this.searchCleared.emit();
    }
  }

  onSearch(): void {
    const query = this.query.trim();
    if (query) {
      this.searchSubject.next(query);
    }
  }

  selectItem(item: SearchResult): void {
    this.query = item.title || item.name || '';
    this.showResults.set(false);
    this.itemSelected.emit(item);

    if (item.media_type === 'movie') {
      this.router.navigate(['/movies', item.id]);
    } else if (item.media_type === 'tv') {
      this.router.navigate(['/tv-shows', item.id]);
    }
  }

  onBlur(): void {
    setTimeout(() => {
      this.showResults.set(false);
    }, 100);
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
  }

  onClick(event: MouseEvent) {
    if (this.showResults &&
      this.searchContainer &&
      !this.searchContainer.nativeElement.contains(event.target)) {
      this.showResults.set(false);
    }
  }

  onSearchByEnter() {
    const query = this.query.trim();
    if (query) {
      this.isLoading.set(true);

      // Utilizamos la página 1 para la primera búsqueda por Enter
      this.movieService.searchMulti(query, 1).subscribe({
        next: (response: any) => { 
          const filteredResults = response.results.filter(
            (item: any) => item.media_type === 'movie' || item.media_type === 'tv'
          );

          this.searchByEnter.emit({
            results: filteredResults,
            page: response.page,
            total_pages: response.total_pages,
            total_results: response.total_results,
            query: query
          });

          this.showResults.set(false);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Search error:', error);
          this.isLoading.set(false);
        }
      });
    }
  }
}
