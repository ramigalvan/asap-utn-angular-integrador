import { Component, Input, inject } from '@angular/core';
import { TrendingItem, TrendingMovie, TrendingTVShow } from '../../models/trending';
import { FavoritesService } from '../../services/favorites';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.html',
  styleUrl: './movie-grid.css',
  imports: [RouterLink]
})
export class MovieGrid {
  @Input() movies: TrendingItem[] = [];
  @Input() mediaType: 'all' | 'movie' | 'tv' = 'all';
  @Input() title: string = 'Trending';
  
  favoritesService = inject(FavoritesService);

  getFilteredItems(): TrendingItem[] {
    if (this.mediaType === 'all') return this.movies;
    return this.movies.filter(item => item.media_type === this.mediaType);
  }

  isMovie(item: TrendingItem): item is TrendingMovie {
    return item.media_type === 'movie';
  }

  isTV(item: TrendingItem): item is TrendingTVShow {
    return item.media_type === 'tv';
  }

  toggleFavorite(item: TrendingItem): void {
    if (this.favoritesService.isFavorite(item.id)) {
      this.favoritesService.removeFromFavorites(item.id);
    } else {
      this.favoritesService.addToFavorites(item);
    }
  }

  isFavorite(id: number): boolean {
    return this.favoritesService.isFavorite(id);
  }
}
