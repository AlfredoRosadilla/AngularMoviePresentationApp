import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { AuthenticationService } from '@app/services/authentication/authentication.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private router: Router,
    private media: ObservableMedia,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    // Automatically close side menu on screens > sm breakpoint
    this.media.asObservable()
      .pipe(filter((change: MediaChange) => (change.mqAlias !== 'xs' && change.mqAlias !== 'sm')))
      .subscribe(() => this.sidenav.close());
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string {
    const credentials = this.authenticationService.credentials;

    return credentials ? credentials.username : null;
  }
}
