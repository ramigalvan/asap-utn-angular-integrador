// Tipo base común a películas y series
export interface TrendingItemBase {
    adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  media_type: 'movie' | 'tv';
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// Películas
export interface TrendingMovie extends TrendingItemBase {
  media_type: 'movie';
  title: string;
  release_date: string;
}

// Series de TV
export interface TrendingTVShow extends TrendingItemBase {
  media_type: 'tv';
  name: string;
  first_air_date: string;
}

// Unión para cualquier tipo de resultado
export type TrendingItem = TrendingMovie | TrendingTVShow;

// Respuesta completa del endpoint
export interface TrendingResponse {
  page: number;
  results: TrendingItem[];
  total_pages: number;
  total_results: number;
}
