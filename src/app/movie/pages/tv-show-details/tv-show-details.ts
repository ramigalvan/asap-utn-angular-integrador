import { Component, OnInit, signal, inject } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { TVShowDetails } from '../../models/tv-show-details';
import { MovieService } from '../../services/movie-service';

@Component({
  selector: 'app-tv-show-details',
  imports: [CommonModule],
  templateUrl: './tv-show-details.html',
  styleUrl: './tv-show-details.css',
  standalone: true,
  providers: [DatePipe]
})
export class TvShowDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private location = inject(Location);

  tvShow = signal<TVShowDetails | undefined>(undefined);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.loadTvShowDetails(id);
    } else {
      console.error('ID de TV-SHOW no encontrado en la URL.');
      this.error.set('ID de TV-SHOW no válido');
      this.loading.set(false);
    }
  }

  formatRuntime(minutes: number | null | undefined): string {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  getReleaseYear(dateString: string): string {
    return dateString ? new Date(dateString).getFullYear().toString() : 'N/A';
  }

  goBack(): void {
    this.location.back();
  }

  private loadTvShowDetails(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.movieService.getTvShowDetailsById(id).subscribe({
      next: (show: TVShowDetails) => {
        if (!show.id) {
          this.error.set('No se encontraron detalles para esta serie.');
          return;
        }
        this.tvShow.set(show);
      },
      error: (err: any) => {
        console.error('Error al cargar los detalles de la serie:', err);
        this.error.set('Error al cargar los detalles de la serie. Por favor, inténtalo de nuevo más tarde.');
      },
      complete: () => this.loading.set(false)
    });
  }
}
