import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { Injector } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { SharedModule, FooterComponent } from '@app/shared';
import { ServicesModule, MoviesService, AlertService } from '@app/services';

describe('FooterComponent', () => {
  let injector: Injector;
  let mockRouter: any;
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
      events: of(new NavigationEnd(0, '/detail', '/something')),
      url: '/something'
    };
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FlexLayoutModule,
        RouterTestingModule,

        SharedModule,
        ServicesModule,

        TranslateModule.forRoot(),
      ],
      declarations: [],
      providers: [{
        provide: ActivatedRoute,
        useClass: class { firstChild = jasmine.createSpy('firstChild'); }
      }, {
        provide: Router,
        useValue: mockRouter
      }]
    })
    .compileComponents();
  }));

  beforeEach(inject([Injector], (_injector: Injector) => {
    fixture = TestBed.createComponent(FooterComponent);
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

  describe('Methods', () => {
    describe('ngOnInit', () => {
      it('should exist a method called ngOnInit', () => {
        fixture.detectChanges();

        expect(component.ngOnInit).toBeDefined();
      });
    });

    describe('isCurrentView', () => {
      it('should exist a method called isCurrentView', () => {
        fixture.detectChanges();

        expect(component.isCurrentView).toBeDefined();
      });

      it('should return true', () => {
        fixture.detectChanges();

        expect(component.isCurrentView('detail')).toBeTruthy();
      });

      it('should return false', () => {
        fixture.detectChanges();

        expect(component.isCurrentView('other')).toBeFalsy();
      });
    });

    describe('executeAction', () => {
      it('should exist a method called executeAction', () => {
        fixture.detectChanges();

        expect(component.executeAction).toBeDefined();
      });

      it('should call to MoviesService setFavorite method', () => {
        const moviesService = injector.get(MoviesService);

        spyOn(moviesService, 'setFavorite').and.returnValue(of(true));

        mockRouter.url = '/detail';

        fixture.detectChanges();

        component.executeAction('right-button');

        expect(moviesService.setFavorite).toHaveBeenCalled();
      });

      it('should call to AlertService showAlert method', (done: any) => {
        const moviesService = injector.get(MoviesService);
        const alertService = injector.get(AlertService);

        spyOn(moviesService, 'setFavorite').and.returnValue(throwError('Generic error'));
        spyOn(alertService, 'showAlert').and.returnValue(true);

        fixture.detectChanges();

        component.executeAction('right-button');

        moviesService.setFavorite(0, true).subscribe(() => {}, () => {
          expect(alertService.showAlert).toHaveBeenCalled();
          done();
        })
      });
    });
  });
});
