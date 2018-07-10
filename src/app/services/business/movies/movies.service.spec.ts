import { Observable, of } from 'rxjs';
import { Injector } from '@angular/core';
import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { movies } from './movie.mock-data';
import { environment } from '@env/environment';
import { MoviesService, IMovie } from './movies.service';

describe('MoviesService', () => {
  let injector: Injector;
  let service: MoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        MoviesService,
        {
          provide: HttpClient,
          useValue: {
            get: (url: string) => of(new Blob())
          }
        }
      ]
    });
  });

  beforeEach(inject([MoviesService, Injector], (moviesService: MoviesService, _injector: Injector) => {
    injector = _injector;
    service = moviesService;

    service['delayRequest'] = () => 0;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should exist a method called getAll', () => {
      expect(service.getAll).toBeDefined();
    });

    it('should return an Observable', () => {
      expect(service.getAll() instanceof Observable).toEqual(true);
    });

    it('should return an array of IMovie', (done: any) => {
      service.getAll().subscribe((data: IMovie[]) => {
        expect(data instanceof Array).toEqual(true);
        data.forEach((movie) => {
          expect(movie.id).toBeDefined();
          expect(movie.key).toBeDefined();
          expect(movie.name).toBeDefined();
          expect(movie.description).toBeDefined();
          expect(movie.genres).toBeDefined();
          expect(movie.favorite).toBeDefined();
          expect(movie.rate).toBeDefined();
          expect(movie['length']).toBeDefined();
          expect(movie.img).toBeDefined();

          expect(typeof movie.id).toEqual('number');
          expect(typeof movie.key).toEqual('string');
          expect(typeof movie.name).toEqual('string');
          expect(typeof movie.description).toEqual('string');
          expect(movie.genres instanceof Array).toEqual(true);
          expect(typeof movie.favorite).toEqual('boolean');
          expect(typeof movie.rate).toEqual('string');
          expect(typeof movie['length']).toEqual('string');
          expect(typeof movie.img).toEqual('string');
        });
        done();
      });
    });
  });

  describe('getById', () => {
    it('should exist a method called getById', () => {
      expect(service.getById).toBeDefined();
    });

    it('should return an Observable', () => {
      expect(service.getAll() instanceof Observable).toEqual(true);
    });

    it('should return an object of IMovie', (done: any) => {
      service.getById(movies[0].id).subscribe((data: IMovie) => {
        expect(data.id).toBeDefined();
        expect(data.key).toBeDefined();
        expect(data.name).toBeDefined();
        expect(data.description).toBeDefined();
        expect(data.genres).toBeDefined();
        expect(data.favorite).toBeDefined();
        expect(data.rate).toBeDefined();
        expect(data['length']).toBeDefined();
        expect(data.img).toBeDefined();

        expect(typeof data.id).toEqual('number');
        expect(typeof data.key).toEqual('string');
        expect(typeof data.name).toEqual('string');
        expect(typeof data.description).toEqual('string');
        expect(data.genres instanceof Array).toEqual(true);
        expect(typeof data.favorite).toEqual('boolean');
        expect(typeof data.rate).toEqual('string');
        expect(typeof data['length']).toEqual('string');
        expect(typeof data.img).toEqual('string');
        done();
      });
    });
  });

  describe('setFavorite', () => {
    it('should exist a method called setFavorite', () => {
      expect(service.setFavorite).toBeDefined();
    });

    it('should return an Observable', () => {
      expect(service.getAll() instanceof Observable).toEqual(true);
    });

    it('should set favorite property to a movie instance', (done: any) => {
      const currentFavoriteValue = movies[0].favorite;

      service.setFavorite(movies[0].id, !currentFavoriteValue).subscribe((change: boolean) => {
        expect(change).toEqual(true);
        expect(movies[0].favorite).toEqual(!currentFavoriteValue);
        done();
      });
    });
  });

  describe('getGenres', () => {
    it('should exist a method called getGenres', () => {
      expect(service.getGenres).toBeDefined();
    });

    it('should return an Observable', () => {
      expect(service.getAll() instanceof Observable).toEqual(true);
    });

    it('should return a list of strings', (done: any) => {
      service.getGenres().subscribe((data: string[]) => {
        expect(data instanceof Array).toEqual(true);
        expect(typeof data[0]).toEqual('string');
        done();
      });
    });
  });

  describe('getMovieImage', () => {
    it('should exist a method called getMovieImage', () => {
      expect(service.getMovieImage).toBeDefined();
    });

    it('should return an Observable', () => {
      expect(service.getAll() instanceof Observable).toEqual(true);
    });

    it('should call HttpClient get method to get asset', (done: any) => {
      const http = injector.get(HttpClient);

      spyOn(http, 'get');

      service.getMovieImage(movies[0]).subscribe(() => {}, (error: any) => {
        expect(http.get).toHaveBeenCalledWith(
          `${environment.serverUrl}assets/images/${movies[0].img}`,
          { responseType: 'blob' }
        );
        done();
      });
    });
  });
});
