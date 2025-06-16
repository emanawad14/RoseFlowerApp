import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CookiesService } from './cookies.service';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'app-theme';
  private  currentTheme = 'light';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _CookiesService: CookiesService
  ) {}
  setTheme(theme: 'light' | 'dark' = this.getTheme()) {
    this.setHtmlTheme(theme); // Apply to <html>
    this._CookiesService.saveToCookies(this.storageKey, theme);
  }
  getTheme(): 'light' | 'dark' {
    return (
      (this._CookiesService.getFromCookies(this.storageKey) as
        | 'light'
        | 'dark') || this.currentTheme
    );
  }
  initialTheme(theme:string |null) {
    if(theme==null) theme='light';
    this.setHtmlTheme(theme);
    this.currentTheme=theme;
  }
  toggleTheme() {
    let newTheme: 'light' | 'dark' =
      this._CookiesService.getFromCookies(this.storageKey) === 'light'
        ? 'dark'
        : 'light';
    if (this._CookiesService.getFromCookies(this.storageKey) == null) {
      newTheme = 'light';
    }

    this.setTheme(newTheme);
  }

  private setHtmlTheme(theme: string) {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('theme', theme);
    }
  }
}
