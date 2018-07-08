import { Component, OnInit } from '@angular/core';

import {
  I18nService,
  AlertService,
  ThemeService,
  AuthenticationService,
} from '@app/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private oldPassword = '';
  private newPassword = '';
  public themeSelected: string = '';

  constructor(
    private i18nService: I18nService,
    private alertService: AlertService,
    private themeService: ThemeService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {}

  setLanguage() {
    const currentIndex = this.languages.indexOf(this.currentLanguage);
    const indexToSet = this.languages.length <= currentIndex + 1 ? 0 : currentIndex + 1;

    this.i18nService.language = this.languages[indexToSet];
  }

  get username(): string {
    const credentials = this.authenticationService.credentials;

    return credentials ? credentials.username : null;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get themeList(): string[] {
    return this.themeService.themeList;
  }

  get currentTheme(): string {
    return this.themeService.currentTheme;
  }

  setTheme(theme: any) {
    this.themeService.setTheme(theme.value);
  }

  changePassword() {
    this.alertService.showAlert('information', {
      text: 'This is a cool alert',
      solution: 'This feature was not created yet',
      translate: ['text', 'solution']
    });
  }
}
