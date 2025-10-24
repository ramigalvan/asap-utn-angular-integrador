import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  media_type: 'movie' | 'tv';
  poster_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  overview?: string;
  vote_average?: number;
  [key: string]: any; 
}

@Component({
  selector: 'app-movie-search-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-search-list.html',
})
export class MovieSearchList {
  @Input() results: SearchResult[] = [];
  @Input() query: string = '';
  @Output() pageChange = new EventEmitter<number>();

  itemsPerPage = 20;
  currentPage = 1;
  totalPages = 1;
  pagedResults: SearchResult[] = [];


  ngOnChanges(changes: SimpleChanges) {
    if (changes['results'] || changes['currentPage']) {
      this.updatePagination();
    }
  }

  private updatePagination() {
    this.totalPages = Math.max(1, Math.ceil(this.results.length / this.itemsPerPage));
    this.currentPage = Math.min(Math.max(1, this.currentPage), this.totalPages);

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedResults = this.results.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.updatePagination();
      this.pageChange.emit(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }


  private _results: SearchResult[] = [];

  get resultsList(): SearchResult[] {
    return this._results;
  }

  getImageUrl(posterPath: string | null | undefined): string {
    if (!posterPath) return 'assets/no-image-available.jpg';
    return `https://image.tmdb.org/t/p/w200${posterPath}`;
  }

  getTitle(item: SearchResult): string {
    return item.title || item.name || 'Untitled';
  }

  trackByFn(index: number, item: SearchResult): number {
    return item.id;
  }

  getReleaseYear(item: SearchResult): string {
    const date = item.release_date || item.first_air_date;
    return date ? new Date(date).getFullYear().toString() : 'N/A';
  }
}
