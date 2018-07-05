import { TestBed, inject } from '@angular/core/testing';

import { Route } from './route.service';
import { ShellComponent } from '@app/shared';
import { AuthenticationGuard, AuthenticationService } from '@app/services';

describe('Route', () => {
  let route: Route;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        Route
      ]
    });
  });

  beforeEach(inject([Route], (_route: Route) => {
    route = _route;
  }));

  describe('withShell', () => {
    it('should create routes as children of shell', () => {
      // Prepare
      const testRoutes = [{ path: 'test' }];

      // Act
      const result = Route.withShell(testRoutes);

      // Assert
      expect(result.path).toBe('');
      expect(result.children).toBe(testRoutes);
      expect(result.component).toBe(ShellComponent);
    });
  });
});
