import { Component, EventEmitter, inject, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrendingItem, TrendingMovie } from '../../models/trending';
import { MovieService } from '../../services/movie-service';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit, OnDestroy {
  @Input() searchType: 'all' | 'movie' | 'tv' = 'all';
  @Output() searchResults = new EventEmitter<TrendingItem[]>();
  @Output() noResults = new EventEmitter<boolean>();
  @Output() queryChange = new EventEmitter<string>();
  
  query = '';
  suggestions: TrendingItem[] = [];
  showSuggestions = false;
  
  private searchSubject = new Subject<string>();
  private subscription: Subscription | null = null;
  
  movieService = inject(MovieService);

  ngOnInit() {
    this.subscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      if (query) {
        this.movieService.searchItems(query, this.searchType)
          .subscribe(results => {
            this.suggestions = results.slice(0, 5); // Limitamos a 5 sugerencias
            this.showSuggestions = true;
          });
      } else {
        this.suggestions = [];
        this.showSuggestions = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.query = input.value;
    this.queryChange.emit(this.query);
    this.searchSubject.next(this.query);
  }

  onSearch() {
    if (this.query) {
      this.movieService.searchItems(this.query, this.searchType)
        .subscribe({
          next: (results) => {
            this.searchResults.emit(results);
            this.noResults.emit(results.length === 0);
            this.showSuggestions = false;
          },
          error: (error) => {
            console.error('Error during search:', error);
            this.searchResults.emit([]);
            this.noResults.emit(true);
          }
        });
    } else {
      this.searchResults.emit([]);
      this.noResults.emit(false);
    }
  }

  selectSuggestion(item: TrendingItem) {
    this.query = 'title' in item ? item.title : item.name;
    this.showSuggestions = false;
    this.searchResults.emit([item]);
    this.noResults.emit(false);
  }
   isMovie(item: TrendingItem): item is TrendingMovie {
    return item.media_type === 'movie';
  }
}
