import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { GenreType } from './movie.model';
import { movies } from './movie.mock-data';

export interface IMovie {
  id: number;
  img: string;
  key: string;
  name: string;
  rate: string;
  length: string;
  genres: string[];
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor() { }

  /**
   * Return all Movies
   */
  getAll(): Observable<IMovie[]> {
    return of(movies);
  }

  /**
   * @param {!number} id The id of movie to get.
   *
   * Get a movie by id, otherwise returns null
   */
  getById(id: number): Observable<IMovie> {
    return of(movies.find((movie: IMovie) => movie.id === id));
  }

  /**
   * Return all Genres
   */
  getGenres(): Observable<string[]> {
    return of(Object.values(GenreType));
  }
}
