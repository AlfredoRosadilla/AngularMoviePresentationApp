import { MatSidenav } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { AuthenticationService, I18nService } from '@app/services';

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
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    if (this.router.url === '/search') {
      this.showSearch = false;
    }

    this.router.events.subscribe(($event: any) => {
      if ($event instanceof NavigationEnd) {
        this.showSearch = Boolean($event.url !== '/search');
      }
    });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string {
    const credentials = this.authenticationService.credentials;

    return credentials ? credentials.username : null;
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
