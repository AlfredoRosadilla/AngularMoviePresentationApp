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
  genres: string[];
  favorite: boolean;
  description: string;

  imageData?: any;
  searchCriteria?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private imagesCache: any = {};

  constructor(private http: HttpClient) {}

  /**
   * @return {number} between 0 - maxDelayTime, it represents delay time.
   * Get a number used to simulate request time
   */
  private delayRequest(): number {
    const maxDelayTime = 3000;

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
   * @param {!id} number The movie to update.
   * @param {!boolean} isFavorite Value to apply.
   *
   * Apply favorite state to a movie instance.
   *
   * @return a boolean confirming the state changed.
   */
  setFavorite(id: number, isFavorite: boolean): Observable<boolean> {
    movies.find((movie: IMovie) => movie.id === id).favorite = isFavorite;

    return of(true);
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
   * If the image is not in memory apply lazy load
   * and save image on service memory.
   *
   * For cache solution it's possible use too sessionStorage, localStorage
   * or even cookies (deprecate way).
   *
   * In this particular case it is better use service memory for avoid the
   * evaluator user needs to open other tab to see lazy load feature.
   *
   * On a real case it is better use at least sessionStorage for improve
   * assets loading covering too those cases where the user need reload
   * the browser tab or even navigate and return to the page.
   *
   * localStorage it is the better option but too the most hardly because
   * needs to implement a complex logic to recognize oldest assets otherway
   * the application doesn't recognize server assets changes.
   */
  getMovieImage(movie: IMovie): Observable<any> {
    return new Observable((observer: any) => {
      if (this.imagesCache[movie.id]) {
        observer.next(this.imagesCache[movie.id]);
        observer.complete();
      } else {
        const imageUrl = `${environment.serverUrl}assets/images/${movie.img}`;
        const request= this.http.get(imageUrl, { responseType: 'blob' });

        request.pipe(delay(this.delayRequest()));

        request.subscribe((imageData: Blob) => {
          try {
            const reader = new FileReader();

            reader.addEventListener('load', () => {
              observer.next(reader.result);
              observer.complete();

              this.imagesCache[movie.id] = reader.result;
            }, false);

            reader.readAsDataURL(imageData);
          } catch(error) {
            observer.error(error);
          }
        }, (error: any) => {
          observer.error(error);
        });
      }
    })
  }
}
