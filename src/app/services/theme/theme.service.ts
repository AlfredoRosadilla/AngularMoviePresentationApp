import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _currentTheme: string = null;
  private _themesList: string[] = [
    'light-theme',
    'dark-theme'
  ];

  constructor() {
    this._currentTheme = this._themesList[0];
    this.generateOptions();
  }

  private generateOptions() {
    const colors = [
      'red',
      'grey',
      'blue',
      'indigo',
      'orange',
      'light-blue',
      'blue-grey',
      'light-green',
      'deep-orange',
    ];

    for (let color1 = 0; color1 < colors.length; color1++) {
      for (let color2 = 0; color2 < colors.length; color2++) {
        this._themesList.push(`${this._themesList[0]} ${colors[color1]}_${colors[color2]}`);
        this._themesList.push(`${this._themesList[1]} ${colors[color1]}_${colors[color2]}`);
      }
    }
  }

  get currentTheme(): string {
    return this._currentTheme;
  }

  get themeList(): string[] {
    return this._themesList;
  }

  setTheme(theme: string) {
    if (this._themesList.indexOf(theme) !== -1) {
      this._currentTheme = theme;
    }
  }
}
