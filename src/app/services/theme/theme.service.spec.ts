import { TestBed, inject } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
  });

  beforeEach(inject([ThemeService], (themeService: ThemeService) => {
    service = themeService;
  }))

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Properties', () => {
    it('should have a property themeList', () => {
      expect(service.themeList).toBeTruthy();
    });

    it('should have a property currentTheme', () => {
      expect(service.currentTheme).toBeTruthy();
    });

    it('should themeList be a list of strings', () => {
      expect(service.themeList instanceof Array).toBeTruthy();

      service.themeList.forEach((theme: string) => {
        expect(typeof theme).toEqual('string');
      })
    });

    it('should currentTheme be a strings', () => {
      expect(typeof service.currentTheme).toEqual('string');
    });
  })

  describe('setTheme method', () => {
    it('should exist a method called setTheme', () => {
      expect(service.setTheme).toBeDefined();
    });

    it('should set a theme', () => {
      const theme = service.themeList[0];

      service.setTheme(theme);

      expect(service.currentTheme).toEqual(theme);
    });

    it('shouldn\'t set a theme if is not in the theme list', () => {
      const theme = 'something weiro';

      service.setTheme(theme);

      expect(service.currentTheme).not.toEqual(theme);
    });
  })
});
