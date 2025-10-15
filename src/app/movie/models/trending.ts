// Tipo base común a películas y series
export interface TrendingItemBase {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  overview: string;
  poster_path: string | null;
  media_type: 'movie' | 'tv';
  original_language: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
}

// Películas
export interface TrendingMovie extends TrendingItemBase {
  media_type: 'movie';
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

// Series de TV
export interface TrendingTVShow extends TrendingItemBase {
  media_type: 'tv';
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
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
