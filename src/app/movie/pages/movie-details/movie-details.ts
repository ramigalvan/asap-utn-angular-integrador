import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { MovieDetails as IMovieDetails } from '../../models/movie-details';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private router = inject(Router);

  movie = signal<IMovieDetails | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.loadMovieDetails(id);
    } else {
      this.error.set('ID de película no encontrado en la URL.');
      this.loading.set(false);
    }
  }

  /**
   * Obtiene los nombres de los géneros de la película
   */
  getGenreNames(): string {
    const movie = this.movie();
    if (!movie || !movie.genres || movie.genres.length === 0) {
      return 'No disponible';
    }
    return movie.genres.map(genre => genre.name).join(', ');
  }

  /**
   * Obtiene el año de lanzamiento
   */
  getReleaseYear(): string {
    const movie = this.movie();
    if (!movie || !movie.release_date) return '';
    return new Date(movie.release_date).getFullYear().toString();
  }

  /**
   * Formatea el tiempo de ejecución en horas y minutos
   */
  formatRuntime(minutes: number | null | undefined): string {
    if (minutes === null || minutes === undefined || minutes === 0) return 'No disponible';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  private loadMovieDetails(id: number): void {
    this.loading.set(true);
    this.error.set(null);
    console.log('Loading movie details for ID:', id);

    this.movieService.getMovieDetailsById(id).subscribe({
      next: (movie) => {
        console.log('Received movie data:', movie);
        if (!movie || !movie.id) {
          const errorMsg = 'No se encontraron detalles para esta película.';
          console.error(errorMsg, { movie });
          this.error.set(errorMsg);
          return;
        }
        this.movie.set(movie);
      },
      error: (err) => {
        const errorMsg = 'Error al cargar los detalles de la película. Por favor, inténtalo de nuevo más tarde.';
        console.error(errorMsg, err);
        this.error.set(errorMsg);
      },
      complete: () => {
        console.log('Movie details loading completed');
        this.loading.set(false);
      }
    });
  }
}
