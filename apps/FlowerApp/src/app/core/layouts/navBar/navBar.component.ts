import { ThemeService } from './../../services/theme-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule, Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MyTranslateService } from '../../services/my-translate-service.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    RippleModule,
    MenuModule,
    BadgeModule,
    Dialog,
    InputTextModule,
    TranslatePipe,
  ],
  templateUrl: './navBar.component.html',
  styleUrl: './navBar.component.scss',
})
export class NavBarComponent implements OnInit {
  langClick = false;
  darkMode = false;
  @ViewChild('menu') menu!: Menu;

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      // icon: 'fa-solid fa-home text-pink-500',
      routerLink: '/home',
      styleClass: 'py-2 paragraph-text',
    },
    {
      label: 'Categories',
      // icon: 'fa-solid fa-list text-pink-500',
      routerLink: '/categories',
      styleClass: 'py-2 paragraph-text',
    },
    {
      label: 'About',
      // icon: 'fa-solid fa-circle-info text-pink-500',
      routerLink: '/about',
      styleClass: 'py-2 paragraph-text',
    },
    {
      label: 'Contact',
      // icon: 'fa-solid fa-envelope text-pink-500',
      routerLink: '/contact',
      styleClass: 'py-2 paragraph-text',
    },
  ];
  constructor(
    private _themeService: ThemeService,
    private _MyTranslateService: MyTranslateService
  ) {}
  /**
   * Toggles the mobile menu
   * @param event - The click event that triggered the toggle
   */
  toggleMenu(event: Event) {
    this.menu.toggle(event);
  }
  ngOnInit() {
    //initial theme
    this._themeService.initialTheme();
  }
  toggleDarkMode() {
    this._themeService.toggleTheme();
  }

  visible = false;

  position:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'center'
    | 'topleft'
    | 'topright'
    | 'bottomleft'
    | 'bottomright' = 'topleft';

  showDialog(
    position:
      | 'left'
      | 'right'
      | 'top'
      | 'bottom'
      | 'center'
      | 'topleft'
      | 'topright'
      | 'bottomleft'
      | 'bottomright'
  ) {
    this.position = 'topleft';
    this.visible = true;
  }

  languageToggle() {
    this.langClick = !this.langClick;
  }
  changeLanguage(lang: string): void {
    this._MyTranslateService.changeTranslateLange(lang);
  }
  currentLanguage(lang: string): boolean {
    return this._MyTranslateService.currentLang === lang;
  }
  darkModeToggle() {
    this.darkMode = !this.darkMode;
  }
}
