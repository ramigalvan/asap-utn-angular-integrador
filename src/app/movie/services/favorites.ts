import { Injectable } from '@angular/core';
import { TrendingItem } from '../models/trending';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'favorites';
  private favoritesSubject = new BehaviorSubject<TrendingItem[]>([]);

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.favoritesSubject.next(JSON.parse(stored));
    }
  }

  getFavorites(): Observable<TrendingItem[]> {
    return this.favoritesSubject.asObservable();
  }

  addToFavorites(item: TrendingItem): void {
    const currentFavorites = this.favoritesSubject.value;
    if (!currentFavorites.find(f => f.id === item.id)) {
      const newFavorites = [...currentFavorites, item];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newFavorites));
      this.favoritesSubject.next(newFavorites);
    }
  }

  removeFromFavorites(id: number): void {
    const currentFavorites = this.favoritesSubject.value;
    const newFavorites = currentFavorites.filter(item => item.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newFavorites));
    this.favoritesSubject.next(newFavorites);
  }

  isFavorite(id: number): boolean {
    return this.favoritesSubject.value.some(item => item.id === id);
  }
}
