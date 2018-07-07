import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { GenreType } from './movie.model';
import { movies } from './movie.mock-data';
import { environment } from '@env/environment';

export interface IMovie {
  id: number;
  img: string;
  key: string;
  name: string;
  rate: string;
  length: string;
  imageData?: any;
  genres: string[];
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

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

  /**
   * This method allow us simulate lazy load
   * @param {IMovie} used to generate image url
   *
   * Get an image from a Movie instance
   */
  getMovieImage(movie: IMovie): Observable<any> {
    return new Observable((observer: any) => {
      const imageUrl = `${environment.serverUrl}assets/images/${movie.img}`;
      const request= this.http.get(imageUrl, { responseType: 'blob' });

      request.pipe(delay(this.delayRequest()));

      request.subscribe((imageData: Blob) => {
        try {
          const reader = new FileReader();

          reader.addEventListener('load', () => {
            observer.next(reader.result);
            observer.complete();
          }, false);

          reader.readAsDataURL(imageData);
        } catch(error) {
          observer.error(error);
        }
      }, (error: any) => {
        observer.error(error);
      });
    })
  }
}
