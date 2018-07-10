import { filter } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationService, AlertService } from '@app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav;

  public showSearch = true;

  constructor(
    private router: Router,
    private titleService: Title,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    if (this.router.url === '/search') {
      this.showSearch = false;
    }

    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(($event: any) => {
      this.showSearch = Boolean($event.url !== '/search');
    });
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  showNotifications() {
    this.alertService.showAlert('information', {
      text: 'You have not notifications',
      translate: ['text']
    });
  }

  get username(): string {
    const credentials = this.authenticationService.credentials;

    return credentials ? credentials.username : null;
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
