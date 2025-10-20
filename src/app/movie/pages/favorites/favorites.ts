import { Component, inject, OnInit } from '@angular/core';
import { MovieGrid } from "../../components/movie-grid/movie-grid";
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-favorites',
  imports: [MovieGrid],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites  {
  favoritesService = inject(FavoritesService)
  favoriteIds: string[] = this.favoritesService.getFavorites()

}
