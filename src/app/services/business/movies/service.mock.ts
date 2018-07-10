import { of } from 'rxjs';
import { GenreType } from './movie.model';
import { movies } from './movie.mock-data';

export const mock: any = {
  getAll: () => of(movies),
  getById: () => of(movies[0]),
  setFavorite: () => of(true),
  getGenres: () => of(GenreType),
  getMovieImage: () => of(new Blob())
};
