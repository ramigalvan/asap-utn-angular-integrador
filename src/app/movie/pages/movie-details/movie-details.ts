import { Component, inject, signal } from '@angular/core';
import { TrendingMovie } from '../../models/trending';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  movie = signal<TrendingMovie | undefined>(undefined);
  loading = signal(true);

  // Constante para el media_type
  private readonly mediaType = 'movie';

  ngOnInit(): void {
    // Obtiene el ID de la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.getDetails(id);
    } else {
      console.error('ID de película no encontrado en la URL.');
      this.loading.set(false);
    }
  }

  getDetails(id: number): void {
    this.loading.set(true);
    // Llama al servicio, pasando el tipo 'movie'
    this.movieService.getDetailsById(this.mediaType, id)
      .subscribe({
        next: (item) => {
          // El resultado debe ser de tipo TrendingMovie
          this.movie.set(item as TrendingMovie);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error al obtener detalles de la película:', err);
          this.loading.set(false);
        }
      });
  }
}
