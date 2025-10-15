import { Component, Input } from '@angular/core';
import { TrendingItem, TrendingMovie, TrendingTVShow } from '../../models/trending';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-movie-grid',
  imports: [RouterLink],
  templateUrl: './movie-grid.html',
  styleUrl: './movie-grid.css'
})
export class MovieGrid {
  @Input() movies: TrendingItem[] = [];

    // 🔍 Type guard: determina si el item es una película
  isMovie(item: TrendingItem): item is TrendingMovie {
    return item.media_type === 'movie';
  }

  // 🔍 Type guard: determina si el item es una serie
  isTV(item: TrendingItem): item is TrendingTVShow {
    return item.media_type === 'tv';
  }

  
}
