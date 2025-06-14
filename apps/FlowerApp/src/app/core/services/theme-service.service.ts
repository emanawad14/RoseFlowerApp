import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'app-theme';
  private readonly currentTheme = 'light';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _LocalStorageService: LocalStorageService
  ) {}
  // loadTheme(): Promise<void> {
  //   return new Promise((resolve) => {
  //     // Apply theme to <body> or <html>
  //     this.initialTheme();
  //     // Update state
  //     resolve(); // let Angular continue bootstrapping
  //   });
  // }

  setTheme(theme: 'light' | 'dark') {
    this.setHtmlTheme(theme); // Apply to <html>
  }
  getTheme(): 'light' | 'dark' {
    return (
      (this._LocalStorageService.getFromLocal(this.storageKey) as
        | 'light'
        | 'dark') || this.currentTheme
    );
  }
  initialTheme() {
    console.log('theme');
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
