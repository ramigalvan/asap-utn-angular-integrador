import { Component, inject, Input, OnInit } from '@angular/core';
import { TrendingItem, TrendingMovie, TrendingTVShow } from '../../models/trending';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../services/favorites';
@Component({
  selector: 'app-movie-grid',
  imports: [RouterLink],
  templateUrl: './movie-grid.html',
  styleUrl: './movie-grid.css'
})
export class MovieGrid  {
  @Input() movies: TrendingItem[] = [];
  favoritesService = inject(FavoritesService)

  isMovie(item: TrendingItem): item is TrendingMovie {
    return item.media_type === 'movie';
  }

  isTV(item: TrendingItem): item is TrendingTVShow {
    return item.media_type === 'tv';
  }

  toggleFavorite(id: string): void {
    if(this.favoritesService.isFavorite(id)){
      this.favoritesService.removeFavorite(id)
    }else{
      this.favoritesService.addFavorite(id)
    }
  }

  isFavorite(id:string): boolean{
    return this.favoritesService.isFavorite(id)
  }

}
