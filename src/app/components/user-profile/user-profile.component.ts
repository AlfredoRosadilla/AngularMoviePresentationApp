import { Component, OnInit } from '@angular/core';

import { AuthenticationService, I18nService, ThemeService } from '@app/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private _oldPassword = '';
  private _newPassword = '';
  public themeSelected: string = '';

  constructor(
    private i18nService: I18nService,
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

  set oldPassword(oldPassword: string) {
    this._oldPassword = oldPassword;
  }

  set newPassword(newPassword: string) {
    this._newPassword = newPassword;
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
}
