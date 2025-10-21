import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../../services/favorites';
import { TrendingItem } from '../../models/trending';
import { MovieGrid } from '../../components/movie-grid/movie-grid';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css'],
  imports: [MovieGrid]
})
export class Favorites implements OnInit {
  favorites: TrendingItem[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    // Nos suscribimos al observable de favoritos
    this.favoritesService.getFavorites().subscribe(
      (items) => {
        this.favorites = items;
      }
    );
  }
}
