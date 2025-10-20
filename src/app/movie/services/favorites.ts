import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly localStorageKey = 'favorites';

  getFavorites(): string[]{
    const favorites = localStorage.getItem(this.localStorageKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  addFavorite(id: string): void {
    const favorites = this.getFavorites()
    if(!favorites.includes(id)){
      favorites.push(id);
      localStorage.setItem(this.localStorageKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(id: string): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter(favId => favId !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(favorites));
  }

  isFavorite(id: string): boolean {
    const favorites = this.getFavorites()
    return favorites.includes(id)
  }
}
