import {
  async,
  inject,
  TestBed,
  ComponentFixture,
} from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@app/shared';
import { ComponentsModule } from '@app/components/components.module';
import { ServicesModule, AuthenticationService, AlertService } from '@app/services';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let mockRouter: any;
  let injector: Injector;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserModule,
        HttpClientModule,
        FlexLayoutModule,
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
    fixture = TestBed.createComponent(LoginComponent);
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
      expect(component.error).toBeDefined();
    });

    it('should have a property isLoading', () => {
      expect(component.isLoading).toBeDefined();
    });

    it('should have a property lastMovie', () => {
      expect(component.loginForm).toBeDefined();
    });
  });

  describe('Methods', () => {
    describe('login', () => {
      it('should exist a method called login', () => {
        expect(component.login).toBeDefined();
      });

      it('shouldn\'t call AuthenticationService login method if login is not valid', (done: any) => {
        const authenticationService = injector.get(AuthenticationService);

        spyOn(authenticationService, 'login').and.returnValue(of(true));

        fixture.detectChanges();

        component.loginForm.setErrors({ 'invalid': true });

        component.login();

        authenticationService.login(null).subscribe(() => {
          expect(authenticationService.login).toHaveBeenCalledTimes(1);
          done();
        });
      });

      describe('loged right', () => {
        beforeEach(() => {
          component.loginForm.controls['username'].setValue('something');
          component.loginForm.controls['password'].setValue('something');
        });

        it('should call AuthenticationService login method if login is valid', (done: any) => {
          const authenticationService = injector.get(AuthenticationService);

          spyOn(authenticationService, 'login').and.returnValue(of(true));

          fixture.detectChanges();

          component.login();

          authenticationService.login(null).subscribe(() => {
            expect(authenticationService.login).toHaveBeenCalledTimes(2);
            done();
          });
        });

        it('should change the isLoading property value', (done: any) => {
          const authenticationService = injector.get(AuthenticationService);

          spyOn(authenticationService, 'login').and.returnValue(of(true));

          fixture.detectChanges();

          component.login();

          authenticationService.login(null).subscribe(() => {
            expect(component.isLoading).toBeFalsy();
            done();
          });
        });

        it('should navigate to home page', (done: any) => {
          const authenticationService = injector.get(AuthenticationService);

          spyOn(authenticationService, 'login').and.returnValue(of(true));

          fixture.detectChanges();

          component.login();

          authenticationService.login(null).subscribe(() => {
            expect(mockRouter.navigate).toHaveBeenCalledWith(['/home'], { replaceUrl: true });
            done();
          });
        });

        it('should call to AlertService showAlert when login fails', (done: any) => {
          const alertService = injector.get(AlertService);
          const authenticationService = injector.get(AuthenticationService);

          spyOn(authenticationService, 'login').and.returnValue(throwError('Generic error'));
          alertService.showAlert = jasmine.createSpy('showAlert');

          fixture.detectChanges();

          component.login();

          authenticationService.login(null).subscribe(() => {}, () => {
            expect(alertService.showAlert).toHaveBeenCalled();
            done();
          });
        });
      });
    });

    describe('setLanguage', () => {
      it('should exist a method called setLanguage', () => {
        fixture.detectChanges();

        expect(component.setLanguage).toBeDefined();
      });
    });
  });

  describe('Dom interaction', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should exist two buttons', () => {
      expect(fixture.nativeElement.querySelectorAll('button').length).toEqual(2);
    });

    it('should exist one username input', () => {
      expect(fixture.nativeElement.querySelector('input[formcontrolname="username"]')).toBeDefined();
    });

    it('should exist one password input', () => {
      expect(fixture.nativeElement.querySelector('input[formcontrolname="password"]')).toBeDefined();
    });

    it('should exist one mat-slide-toggle', () => {
      expect(fixture.nativeElement.querySelector('mat-slide-toggle')).toBeDefined();
    });

    it('should update DOM input values when change model password or username', async(() => {
      component.loginForm.controls['username'].setValue('something1');
      component.loginForm.controls['password'].setValue('something2');

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[formcontrolname="username"]').value).toEqual('something1');
        expect(fixture.nativeElement.querySelector('input[formcontrolname="password"]').value).toEqual('something2');
      });
    }));

    it('should update model value when write on input DOM elements', async(() => {
      const usernameInput = fixture.nativeElement.querySelector('input[formcontrolname="username"]');
      const passwordInput = fixture.nativeElement.querySelector('input[formcontrolname="password"]');

      usernameInput.value = 'something1';
      passwordInput.value = 'something2';

      usernameInput.dispatchEvent(new Event('input'));
      passwordInput.dispatchEvent(new Event('input'));

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(component.loginForm.value.username).toEqual('something1');
        expect(component.loginForm.value.password).toEqual('something2');
      });
    }));
  });
});
