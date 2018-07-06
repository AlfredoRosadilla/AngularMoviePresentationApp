import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
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
   * @return {number} between 0 - maxDelayTime, it represents delay time.
   * Get a number used to simulate request time
   */
  private delayRequest(): number {
    const maxDelayTime = 4000;

    return Math.floor(Math.random() * maxDelayTime);
  }

  /**
   * Return all Movies
   */
  getAll(): Observable<IMovie[]> {
    return of(movies).pipe(delay(this.delayRequest()));
  }

  /**
   * @param {!number} id The id of movie to get.
   *
   * Get a movie by id, otherwise returns null
   */
  getById(id: number): Observable<IMovie> {
    return of(movies.find((movie: IMovie) => movie.id === id)).pipe(delay(this.delayRequest()));
  }

  /**
   * Return all Genres
   */
  getGenres(): Observable<string[]> {
    return of(Object.values(GenreType)).pipe(delay(this.delayRequest()));
  }
}
