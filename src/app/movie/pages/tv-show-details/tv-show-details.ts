import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { TrendingTVShow } from '../../models/trending';

@Component({
  selector: 'app-tv-show-details',
  imports: [],
  templateUrl: './tv-show-details.html',
  styleUrl: './tv-show-details.css'
})
export class TvShowDetails {
private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  tvShow = signal<TrendingTVShow | undefined>(undefined);
  loading = signal(true);

  // Constante para el media_type
  private readonly mediaType = 'tv';

  ngOnInit(): void {
    // Obtiene el ID de la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.getDetails(id);
    } else {
      console.error('ID de TV-SHOW no encontrado en la URL.');
      this.loading.set(false);
    }
  }

  getDetails(id: number): void {
    this.loading.set(true);
    // Llama al servicio, pasando el tipo 'tv'
    this.movieService.getDetailsById(this.mediaType, id)
      .subscribe({
        next: (item) => {
          // El resultado debe ser de tipo TrendingMovie
          this.tvShow.set(item as TrendingTVShow);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error al obtener detalles de la TV-SHOW:', err);
          this.loading.set(false);
        }
      });
  }
}
