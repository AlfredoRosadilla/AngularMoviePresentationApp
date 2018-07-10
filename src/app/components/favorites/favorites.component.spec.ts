import { async, ComponentFixture, TestBed, inject, tick } from '@angular/core/testing';

import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@app/shared';
import { ComponentsModule } from '@app/components/components.module';
import { ServicesModule, MoviesService, IMovie } from '@app/services';

import { FavoritesComponent } from './favorites.component';
import { mock } from '@app/services/business/movies/service.mock';
import { movies } from '@app/services/business/movies/movie.mock-data';

describe('FavoritesComponent', () => {
  let mockRouter: any;
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(async(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserModule,
        HttpClientModule,
        RouterTestingModule,

        SharedModule,
        ServicesModule,
        ComponentsModule,

        BrowserAnimationsModule,

        TranslateModule.forRoot(),
      ],
      declarations: [],
      providers: [{
        provide: MoviesService,
        useValue: mock
      }, {
        provide: Router,
        useValue: mockRouter
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
  });

  describe('Base tests', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });
  });

  describe('Properties tests', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have a property movies', () => {
      expect(component.movies).toBeDefined();
    });

    it('should have a property isLoading', () => {
      expect(component.isLoading).toBeDefined();
    });
  });

  describe('Methods', () => {
    const service = mock;

    describe('ngOnInit', () => {
      it('should exist a method called ngOnInit', () => {
        expect(component.ngOnInit).toBeDefined();
      });

      it('should keep just favorite movies', (done: any) => {
        fixture.detectChanges();

        service.getAll().subscribe(() => {
          expect(component.movies instanceof Array).toEqual(true);

          component.movies.forEach((movie: IMovie) => {
            expect(movie.favorite).toEqual(true);
          });
          done();
        });
      });

      it('should show a spinner', () => {
        fixture.detectChanges();
        component.isLoading = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('app-loader')).toBeDefined();
      });

      it('should remove the spinner after load data', (done: any) => {
        fixture.detectChanges();

        service.getAll().subscribe(() => {
          expect(fixture.nativeElement.querySelector('app-loader')).toBeNull();
          done();
        });
      });

      it('should remove movie grid', () => {
        fixture.detectChanges();
        component.isLoading = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('app-movie-grid')).toBeDefined();
      });

      it('should appear movie grid', (done: any) => {
        fixture.detectChanges();

        service.getAll().subscribe(() => {
          expect(fixture.nativeElement.querySelector('app-movie-grid')).toBeDefined();
          done();
        });
      });
    });

    describe('movieSelected', () => {
      it('should exist a method called movieSelected', () => {
        expect(component.movieSelected).toBeDefined();
      });

      it('should navigate to movie detail view', () => {
        const movieMocked = movies[0];

        component.movieSelected(movieMocked);

        expect(mockRouter.navigate).toHaveBeenCalledWith(['detail', movieMocked.id]);
      });
    });
  });
});
