import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { TrendingItem, TrendingResponse } from '../models/trending';
import { MovieDetails } from '../models/movie-details';
import { TVShowDetails } from '../models/tv-show-details';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'movies.json';
  private readonly apiUrl = environment.apiUrl;
  
  http = inject(HttpClient)

   private getHeaders() {
    return new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${environment.apiKey}`
    });
  }

   getTrendingByAllWeek(page: number = 1): Observable<TrendingResponse> {
    const url = `${this.apiUrl}/trending/all/week?language=en-US&page=${page}`;
    return this.http.get<TrendingResponse>(url, { headers: this.getHeaders() });
  }

  getPopularMovies(page: number = 1): Observable<TrendingResponse> {
    const url = `${this.apiUrl}/movie/popular?language=en-US&page=${page}`;
    return this.http.get<TrendingResponse>(url, { headers: this.getHeaders() }).pipe(
      map(response => {
        const typedResponse = response as any; // Temporary any to avoid type errors
        return {
          ...typedResponse,
          results: typedResponse.results.map((movie: any) => ({
            ...movie,
            media_type: 'movie' as const
          }))
        } as TrendingResponse;
      })
    );
  }

  getPopularTvShows(page: number = 1): Observable<TrendingResponse> {
    const url = `${this.apiUrl}/tv/popular?language=en-US&page=${page}`;
    return this.http.get<TrendingResponse>(url, { headers: this.getHeaders() }).pipe(
      map(response => {
        const typedResponse = response as any; // Temporary any to avoid type errors
        return {
          ...typedResponse,
          results: typedResponse.results.map((show: any) => ({
            ...show,
            media_type: 'tv' as const
          }))
        } as TrendingResponse;
      })
    );
  }

  //implementar el search
  /*
    Search
    get Keyword
    get Movie
    get TV
  */
  searchItems(query: string, mediaType: 'all' | 'movie' | 'tv' = 'all', page: number = 1): Observable<TrendingResponse> {
    const endpoint = mediaType === 'all' ? 'search/multi' : `search/${mediaType}`;
    const url = `${this.apiUrl}/${endpoint}?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`;
    return this.http.get<TrendingResponse>(url, { headers: this.getHeaders() });
  }

  searchMulti(query: string, page: number = 1): Observable<{ results: any[] }> {
    const url = `${this.apiUrl}/search/multi?query=${encodeURIComponent(query)}&include_adult=false&page=${page}`;
    return this.http.get<{ results: any[] }>(url, { headers: this.getHeaders() }).pipe(
      map(response => ({
        ...response,
        results: response.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv')
      }))
    );
  }

  /**
   * Obtiene los detalles de una película por su ID
   * @param id ID de la película
   * @returns Observable con los detalles de la película
   */
  getMovieDetailsById(id: number): Observable<MovieDetails> {
    const url = `${this.apiUrl}/movie/${id}?language=en-US`;
    console.log('Fetching movie details from:', url);
    console.log('Using API key:', environment.apiKey ? 'Present' : 'Missing');
    
    return this.http.get<MovieDetails>(url, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(error => {
        console.error('Error fetching movie details:', {
          url,
          status: error.status,
          message: error.message,
          error: error.error,
          headers: this.getHeaders()
        });
        return of({} as MovieDetails);
      })
    );
  }

  getTvShowDetailsById(id: number): Observable<TVShowDetails> {
    const url = `${this.apiUrl}/tv/${id}?language=en-US`;
    console.log('Fetching TV show details from:', url);
    
    return this.http.get<TVShowDetails>(url, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(error => {
        console.error('Error fetching TV show details:', {
          url,
          status: error.status,
          message: error.message,
          error: error.error,
          headers: this.getHeaders()
        });
        return of({} as TVShowDetails);
      })
    );
  }

  //  searchItems(query: string, mediaType?: 'all' | 'movie' | 'tv'): Observable<TrendingItem[]> {
  //   return this.getTrendingByAllWeek().pipe(
  //     map(response => {
  //       const searchTerm = query.toLowerCase();
  //       return response.results.filter(item => {
  //         // Si se especifica un tipo de medio, filtrar por él
  //         if (mediaType && mediaType !== 'all' && item.media_type !== mediaType) {
  //           return false;
  //         }

  //         // Búsqueda por título/nombre
  //         if ('title' in item) {
  //           return item.title.toLowerCase().includes(searchTerm);
  //         } else {
  //           return item.name.toLowerCase().includes(searchTerm);
  //         }
  //       });
  //     })
  //   );
  // }


}
