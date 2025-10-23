import { Component, Input, inject } from '@angular/core';
import { TrendingItem, TrendingMovie, TrendingTVShow } from '../../models/trending';
import { FavoritesService } from '../../services/favorites';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.html',
  styleUrl: './movie-grid.css',
  imports: [RouterLink, DatePipe, CommonModule]
})
export class MovieGrid {
  @Input() movies: TrendingItem[] = [];
  @Input() mediaType: 'all' | 'movie' | 'tv' = 'all';
  @Input() title: string = '';

  favoritesService = inject(FavoritesService);

  getPosterUrl(posterPath: string | null): string {
    return posterPath 
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : 'https://via.placeholder.com/500x750?text=No+Poster';
  }

  getTitle(item: TrendingItem): string {
    return (item as any).title || (item as any).name || 'Untitled';
  }

  getReleaseDate(item: TrendingItem): string {
    return (item as any).release_date || (item as any).first_air_date || 'N/A';
  }

  isMovie(item: TrendingItem): boolean {
    return item.media_type === 'movie' ||
           (this.mediaType === 'movie' && !('media_type' in item)) 
  }

  isTV(item: TrendingItem): boolean {
    return item.media_type === 'tv' ||
           (this.mediaType === 'tv' && !('media_type' in item)) 
  }
}
