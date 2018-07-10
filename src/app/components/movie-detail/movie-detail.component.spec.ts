import {
  tick,
  async,
  inject,
  TestBed,
  fakeAsync,
  ComponentFixture,
} from '@angular/core/testing';

import { Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of, forkJoin, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@app/shared';
import { ComponentsModule } from '@app/components/components.module';
import { ServicesModule, MoviesService, IMovie, AlertService } from '@app/services';

import { MovieDetailComponent } from './movie-detail.component';
import { movies } from '@app/services/business/movies/movie.mock-data';

const mockedMovie = movies[0];
const mockMovieImg = 'something';

describe('MovieDetailComponent', () => {
  let injector: Injector;
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserModule,
        HttpClientModule,
        RouterTestingModule,

        ServicesModule,
        SharedModule,
        ComponentsModule,

        BrowserAnimationsModule,

        TranslateModule.forRoot(),
      ],
      declarations: [],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          params: of({id: 123})
        }
      }, {
        provide: MoviesService,
        useValue: {
          getById: (id: number) => of(mockedMovie),
          getMovieImage: (movie: IMovie) => of(mockMovieImg)
        }
      }]
    })
    .compileComponents();
  }));

  beforeEach(inject([Injector], (_injector: Injector) => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    injector = _injector;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Controller', () => {
    describe('ngOnInit', () => {
      it('should get movie data', fakeAsync(inject([MoviesService], (moviesService: MoviesService) => {
        fixture.detectChanges();

        moviesService.getById(1).subscribe((movie: IMovie) => {
          expect(component.movie).toBeDefined();
          expect(component.isLoading).toEqual(false);
          expect(component.isFavorite).toEqual(mockedMovie.favorite);
          expect(JSON.stringify(component.movie)).toEqual(JSON.stringify(mockedMovie));
        });
      })));

      it('should show a spinner', fakeAsync(inject([MoviesService], (moviesService: MoviesService) => {
        const spinner = fixture.nativeElement.querySelector('app-loader');

        expect(spinner).toBeDefined();
      })));

      it('should hide a spinner', fakeAsync(inject([MoviesService], (moviesService: MoviesService) => {
        fixture.detectChanges();

        moviesService.getById(1).subscribe(null, () => {
          const spinner = fixture.nativeElement.querySelector('app-loader');

          expect(spinner).toBeUndefined();
        });
      })));

      it('should call AlertService showAlert', (done: any) => {
        const alertService = injector.get(AlertService);
        const moviesService = injector.get(MoviesService);

        alertService.showAlert = jasmine.createSpy('showAlert').and.returnValue(new Promise(() => Promise.resolve));
        moviesService.getById = (id: number) => throwError('Generic error');

        fixture.detectChanges();

        moviesService.getById(1).subscribe(() => {}, (error: any) => {
          expect(alertService.showAlert).toHaveBeenCalled();
          done();
        });
      });

      it('should get image', (done: any) => {
        const moviesService = injector.get(MoviesService);

        fixture.detectChanges();

        forkJoin([
          moviesService.getById(1),
          moviesService.getMovieImage(mockedMovie)
        ]).subscribe((data: any[]) => {
          expect(component.movie.imageData).toEqual(mockMovieImg);
          done();
        });
      });
    });

    describe('setFavorite', () => {
      it('should set isFavorite with opposite value', () => {
        fixture.detectChanges();

        component.isFavorite = true;
        component.setFavorite();
        expect(component.isFavorite).toEqual(false);
      });

      it('should set movie.favorite with opposite value', (done: any) => {
        const moviesService = injector.get(MoviesService);

        fixture.detectChanges();

        forkJoin([
          moviesService.getById(1),
          moviesService.getMovieImage(mockedMovie)
        ]).subscribe((data: any[]) => {
          component.isFavorite = true;
          component.setFavorite();
          expect(component.movie.favorite).toEqual(false);

          done();
        });
      });

      it('should call AlertService showAlert method', () => {
        const alertService = injector.get(AlertService);

        fixture.detectChanges();

        spyOn(alertService, 'showAlert');

        component.setFavorite();

        expect(alertService.showAlert).toHaveBeenCalled();
      });
    });
  });
});
