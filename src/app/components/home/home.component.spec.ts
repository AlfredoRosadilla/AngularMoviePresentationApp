import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@app/shared';
import { ComponentsModule } from '@app/components/components.module';
import { ServicesModule, MoviesService, IMovie, AlertService } from '@app/services';

import { HomeComponent } from './home.component';
import { mock } from '@app/services/business/movies/service.mock';
import { movies } from '@app/services/business/movies/movie.mock-data';

describe('HomeComponent', () => {
  let mockRouter: any;
  let injector: Injector;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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

          ServicesModule,
          SharedModule,
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

  beforeEach(inject([Injector], (_injector: Injector) => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    injector = _injector;
  }));

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

    it('should have a property lastMovie', () => {
      expect(component.lastMovie).toBeDefined();
    });
  });

  describe('Methods', () => {
    const service = mock;

    describe('ngOnInit', () => {
      it('should exist a method called ngOnInit', () => {
        expect(component.ngOnInit).toBeDefined();
      });

      it('should call MoviesService getAll method', (done: any) => {
        spyOn(service, 'getAll').and.returnValue(of(movies));

        fixture.detectChanges();

        service.getAll().subscribe(() => {
          expect(service.getAll).toHaveBeenCalled();
          done();
        });
      });

      it('should lastMovie propery be the last movie', (done: any) => {
        spyOn(service, 'getAll').and.returnValue(of(movies));

        fixture.detectChanges();

        service.getAll().subscribe(() => {
          expect(JSON.stringify(component.lastMovie)).toEqual(JSON.stringify(movies[0]));
          done();
        });
      });

      it('should change isLoading value', (done: any) => {
        fixture.detectChanges();

        service.getAll().subscribe(() => {
          expect(component.isLoading).toEqual(false);
          done();
        });
      });

      xit('should call AlertService showAlert method if request movie image fail', (done: any) => {
        const alertService = injector.get(AlertService);

        alertService.showAlert = jasmine.createSpy('showAlert');
        service.getMovieImage = jasmine.createSpy('movieImage').and.returnValue(throwError('Generic error'));

        fixture.detectChanges();

        service.getMovieImage().subscribe(() => {}, (error: any) => {
          expect(alertService.showAlert).toHaveBeenCalled();
          done();
        });
      });

      it('should show a spinner', () => {
        fixture.detectChanges();
        component.isLoading = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('app-loader.home__spinner')).toBeDefined();
      });

      it('should remove the spinner after load data', async(() => {
        fixture.detectChanges();

        service.getAll().subscribe(() => {
          fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('app-loader.home__spinner')).toBeNull();
          });
        });
      }));

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
