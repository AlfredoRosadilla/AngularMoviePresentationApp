import { Router } from '@angular/router';
import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationGuard', () => {
  let authenticationGuard: AuthenticationGuard;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        AuthenticationService,
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    });
  });

  beforeEach(inject([AuthenticationGuard], (_authenticationGuard: AuthenticationGuard) => {
    authenticationGuard = _authenticationGuard;
  }));

  describe('canActive method', () => {
    let authenticationService: AuthenticationService;

    beforeEach(inject([AuthenticationService], (_authenticationService: AuthenticationService) => {
      authenticationService = _authenticationService;
    }));

    it('should have a canActivate method', () => {
      expect(typeof authenticationGuard.canActivate).toBe('function');
    });

    it('should call isAuthenticated AuthenticationService method', () => {
      spyOn(authenticationService, 'isAuthenticated');

      authenticationGuard.canActivate();

      expect(authenticationService.isAuthenticated).toHaveBeenCalled();
    });

    it('should return true if user is not authenticated', () => {
      spyOn(authenticationService, 'isAuthenticated').and.returnValue(false);

      expect(authenticationGuard.canActivate()).toBe(false);
    });

    it('should return true if user is authenticated', () => {
      spyOn(authenticationService, 'isAuthenticated').and.returnValue(true);

      expect(authenticationGuard.canActivate()).toBe(true);
    });

    it('should return false and redirect to login if user is not authenticated', () => {
      spyOn(authenticationService, 'isAuthenticated').and.returnValue(false);

      expect(authenticationGuard.canActivate()).toBe(false);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], {replaceUrl: true});
    });
  });
});
