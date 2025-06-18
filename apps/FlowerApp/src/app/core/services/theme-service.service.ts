import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CookieUtils } from '../utills/cookie.utills';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'app-theme';
  private readonly defaultTheme = 'light';
  // Cookie utility instance
  private cookieUtils = new CookieUtils();
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}
  setTheme(theme: 'light' | 'dark') {
    this.setHtmlTheme(theme); // Apply to <html>
  }
  getTheme(): 'light' | 'dark' {
    return (
      (this.cookieUtils.getCookie(this.storageKey) as 'light' | 'dark') ||
      this.defaultTheme
    );
  }
  initialTheme() {
    const currentTheme = this.getTheme();
    this.setTheme(currentTheme);
  }
  toggleTheme() {
    const newTheme =
      this.cookieUtils.getCookie(this.storageKey) === 'light'
        ? 'dark'
        : 'light';
    this.setTheme(newTheme);
  }

  private setHtmlTheme(theme: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieUtils.setCookie(this.storageKey, theme);
      // document.documentElement.classList.remove('light', 'dark');
      // document.documentElement.classList.add(theme);
      this.document.documentElement.setAttribute('theme', theme);
    }
  }
}
