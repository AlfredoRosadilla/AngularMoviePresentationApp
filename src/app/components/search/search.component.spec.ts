import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of, throwError, forkJoin } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';
import { SharedModule } from '@app/shared';
import { ComponentsModule } from '@app/components/components.module';
import { ServicesModule, MoviesService, IMovie, AlertService } from '@app/services';

import { SearchComponent } from './search.component';

import { movies } from '@app/services/business/movies/movie.mock-data';
import { GenreType } from '@app/services/business/movies/movie.model';

describe('SearchComponent', () => {
  let mockRouter: any;
  let service: MoviesService;
  let injector: Injector;
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

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
        provide: Router,
        useValue: mockRouter
      }]
    })
    .compileComponents();
  }));

  beforeEach(inject([Injector], (_injector: Injector) => {
    fixture = TestBed.createComponent(SearchComponent);
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

    it('should have a property filterMovies', () => {
      expect(component.filterMovies).toBeDefined();
    });

    it('should have a property genres', () => {
      expect(component.genres).toBeDefined();
    });

    it('should have a property inputValue', () => {
      expect(component.inputValue).toBeDefined();
    });

    it('should have a property isLoading', () => {
      expect(component.isLoading).toBeDefined();
    });
  });

  describe('Methods', () => {
    describe('ngOnInit', () => {
      beforeEach(() => {
        service = injector.get(MoviesService);
      });

      describe('All services return correct values', () => {
        beforeEach(() => {
          service.getAll = jasmine.createSpy('getAll').and.returnValue(of(movies));
          service.getGenres = jasmine.createSpy('getGenres').and.returnValue(of(Object.values(GenreType)));
          fixture.detectChanges();
        });

        it('should exist a method called ngOnInit', () => {
          expect(component.ngOnInit).toBeDefined();
        });

        it('should call MoviesService getAll method', () => {
          expect(service.getAll).toHaveBeenCalled();
        });

        it('should call MoviesService getGenres method', () => {
          expect(service.getGenres).toHaveBeenCalled();
        });

        it('should save movies in component memory', () => {
          const justIdAndName = (movie: IMovie) => [movie.id, movie.name, movie.description];

          expect(
            JSON.stringify(component.filterMovies.map(justIdAndName))
          ).toEqual(JSON.stringify(movies.map(justIdAndName)));
        });

        it('should save genres in component memory', () => {
          expect(JSON.stringify(component.genres)).toEqual(JSON.stringify(Object.values(GenreType)));
        });

        it('should set isLoading to false', () => {
          expect(component.isLoading).toBeFalsy();
        });

        it('should movies has a searchCriteria', () => {
          component.filterMovies.forEach((movie: IMovie) => {
            expect(typeof movie.searchCriteria).toEqual('string');
          });
        });
      });

      describe('All services fail', () => {
        let alertService: AlertService;

        beforeEach(() => {
          alertService = injector.get(AlertService);
          service.getAll = jasmine.createSpy('getAll').and.returnValue(throwError('Generic error'));
          service.getGenres = jasmine.createSpy('getGenres').and.returnValue(throwError('Generic error'));
          alertService.showAlert = jasmine.createSpy('showAlert').and.returnValue(true);

          fixture.detectChanges();
        });

        it('should call AlertService showAlert', () => {
          expect(alertService.showAlert).toHaveBeenCalled();
        });
      });
    });

    describe('search', () => {
      beforeEach(() => {
        service = injector.get(MoviesService);
        service.getAll = jasmine.createSpy('getAll').and.returnValue(of(movies));
        service.getGenres = jasmine.createSpy('getGenres').and.returnValue(of(Object.values(GenreType)));
        fixture.detectChanges();
      });

      it('should exist a method called search', () => {
        expect(component.search).toBeDefined();
      });

      it('should filter movies by criteria', () => {
        const criteria = `${movies[0].name}|${movies[0].description}|${movies[0].genres.join('|')}`;

        component.search(criteria);

        expect(component.filterMovies.indexOf(movies[0]) !== -1).toBeTruthy();
      });

      it('should filter movies by genre', () => {
        const criteria = Object.values(GenreType)[0];
        const moviesWithGenre = movies.filter((movie: IMovie) => Boolean(movie.genres.indexOf(criteria) !== -1));

        component.search(criteria);

        moviesWithGenre.forEach((movie: IMovie) => {
          expect(component.filterMovies.find((movie2: IMovie) => Boolean(movie.id === movie2.id))).toBeDefined();
        });
      });
    });

    describe('movieSelected', () => {
      beforeEach(() => {
        service = injector.get(MoviesService);
        service.getAll = jasmine.createSpy('getAll').and.returnValue(of(movies));
        service.getGenres = jasmine.createSpy('getGenres').and.returnValue(of(Object.values(GenreType)));
        fixture.detectChanges();
      });

      it('should exist a method called movieSelected', () => {
        expect(component.movieSelected).toBeDefined();
      });

      it('should navigate to movies detail', () => {
        component.movieSelected(movies[0]);

        expect(mockRouter.navigate).toHaveBeenCalledWith(['detail', movies[0].id]);
      });
    });
  });

  describe('DOM handle', () => {
    beforeEach(() => {
      service = injector.get(MoviesService);
      service.getAll = jasmine.createSpy('getAll').and.returnValue(of(movies));
      service.getGenres = jasmine.createSpy('getGenres').and.returnValue(of(Object.values(GenreType)));
      fixture.detectChanges();
    });

    // This spinner comes from grid component
    it('should show a spinner', () => {
      component.isLoading = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('app-loader')).toBeDefined();
    });

    it('should appear movie grid', async(() => {
      fixture.detectChanges();

      forkJoin([
        service.getAll(),
        service.getGenres()
      ]).subscribe(() => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('app-movie-grid')).toBeDefined();
      });
    }));

    it('should exist one input', () => {
      expect(fixture.nativeElement.querySelectorAll('input').length).toEqual(1);
    });

    it('should update DOM input value when change model inputValue property', async(() => {
      component.inputValue = 'something';

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input').value).toEqual('something');
      });
    }));

    it('should execute search function when write on input DOM element', async(() => {
      const input = fixture.nativeElement.querySelector('input');

      spyOn(component, 'search');

      input.value = 'something';

      input.dispatchEvent(new Event('input'));

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(component.search).toHaveBeenCalledWith('something');
      });
    }));
  });
});
