import { inject, Inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieUtils } from '../utills/cookie.utills';
import { Theme } from '../../shared/types/theme.type';
import { of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'app-theme';
  private readonly currentTheme = signal<Theme>('light');
  private readonly document = inject(DOCUMENT);

  // Cookie utility instance
  private cookieUtils = new CookieUtils();
  constructor() {
    this.setCurrentTheme(this.cookieUtils.getCookie(this.storageKey) as Theme);
  }
  setTheme(theme: Theme) {
    this.setHtmlTheme(theme); // Apply to <html>
    this.setCurrentTheme(theme);
  }
  getTheme(): Theme {
    return (this.cookieUtils.getCookie(this.storageKey) ??
      ('light' as Theme)) as Theme;
  }
  initialTheme() {
    const currentTheme = this.getTheme();
    console.log('current theme', currentTheme);
    this.setTheme(currentTheme);
    return of(currentTheme).pipe(
      tap(() => {
        console.log(`Init Theme is  ==> ${currentTheme}`);
      })
    );
    // this.setCurrentTheme(currentTheme as Theme);
  }

  setCurrentTheme(theme: Theme) {
    this.currentTheme.set(theme);
    //this.cookieUtils.setCookie(this.storageKey, theme);
  }
  toggleTheme() {
    const currentTheme = this.cookieUtils.getCookie(this.storageKey) ?? 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    this.cookieUtils.setCookie(this.storageKey, newTheme);
  }

  private setHtmlTheme(theme: string) {
    // this.document.documentElement.classList.remove('light', 'dark');
    // this.document.documentElement.classList.add(theme);
    this.document.documentElement.setAttribute('data-theme', theme);
    // this.cookieUtils.setCookie(this.storageKey, theme);
  }
}
