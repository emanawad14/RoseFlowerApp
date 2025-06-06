import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'app-theme';
  private readonly defaultTheme = 'light';
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _LocalStorageService: LocalStorageService
  ) {}
  setTheme(theme: 'light' | 'dark') {
    this.setHtmlTheme(theme); // Apply to <html>
  }
  getTheme(): 'light' | 'dark' {
    return (
      (this._LocalStorageService.getFromLocal(this.storageKey) as
        | 'light'
        | 'dark') || this.defaultTheme
    );
  }
  initialTheme() {
    const currentTheme = this.getTheme();
    this.setTheme(currentTheme);
  }
  toggleTheme() {
    const newTheme =
      this._LocalStorageService.getFromLocal(this.storageKey) === 'light'
        ? 'dark'
        : 'light';
    this.setTheme(newTheme);
  }

  private setHtmlTheme(theme: string) {
    if (isPlatformBrowser(this.platformId)) {
      this._LocalStorageService.saveToLocal(this.storageKey, theme);
      document.documentElement.setAttribute('theme', theme);
    }
  }
}
