import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Logger } from './../logger/logger.service';
import { AuthenticationService } from './authentication.service';

const log = new Logger('AuthenticationGuard');

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(): boolean {
    let iCan = false;

    if (this.authenticationService.isAuthenticated()) {
      iCan = true;
    } else {
      log.debug('Not authenticated, redirecting...');
      this.router.navigate(['/login'], { replaceUrl: true });
    }

    return iCan;
  }
}
