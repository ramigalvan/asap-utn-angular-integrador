import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { TrendingItem, TrendingResponse } from '../models/trending';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'movies.json';
  httpClient = inject(HttpClient)

  getTrendingByAllWeek(): Observable<TrendingResponse> {
    return this.httpClient.get<TrendingResponse>(this.baseUrl)
  }

  // Implementación de getDetailsById
  getDetailsById(mediaType: 'movie' | 'tv', id: number): Observable<TrendingItem | undefined> {
    
    // 1. Realiza la llamada HTTP para obtener todos los resultados (simulando una caché local)
    return this.httpClient.get<TrendingResponse>(this.baseUrl).pipe(
      
      // 2. Usa el operador map para procesar la respuesta
      map(response => {
        // Busca el ítem que coincida con el ID y el mediaType proporcionados
        const item = response.results.find(
          (i) => i.id === id && i.media_type === mediaType
        );
        // Si se encuentra, lo retorna. Si no, retorna undefined.
        return item;
      }),
      
      // Opcional: Manejo de errores en caso de que la carga del JSON falle
      catchError(error => {
        console.error('Error al cargar movies.json para detalles:', error);
        // Retorna un observable de 'undefined' si hay un error de red/carga
        return of(undefined); 
      })
    );
  }

  // getByTitle(query: string): Observable<Movie[]> {
  //   return this.getAll().pipe(
  //     map(movies =>
  //       movies.filter(movie => movie.title
  //         .toLocaleLowerCase()
  //         .includes(query.toLocaleLowerCase())))
  //   )
  // }

}
