import { merge } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/services';

const log = new Logger('App');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private titleService: Title,
    private i18nService: I18nService,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;

          while (route.firstChild) {
            route = route.firstChild;
          }

          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        let title = event['title'];

        if (title) {
          title = `page-title_${ title.toLowerCase().replace(new RegExp(' ', 'g'), '-') }`;

          this.titleService.setTitle(this.translateService.instant(title));
        }

        if (!this.authenticationService.isAuthenticated()) {
          this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
        }
      });
  }
}
