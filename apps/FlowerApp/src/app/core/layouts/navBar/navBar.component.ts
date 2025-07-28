import { ThemeService } from './../../services/theme-service.service';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule, Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MyTranslateService } from '../../services/my-translate-service.service';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../shared/services/auth.service';

import { MenubarModule } from 'primeng/menubar';
import { UserDTO } from 'auth-api/src/lib/auth-api/interfaces/loginRes.dto';
import { GlobalInputComponent } from "../../../shared/components/ui/globalInput.component";
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
    InputTextModule,
    TranslatePipe,
    MenubarModule,
    GlobalInputComponent
],
  templateUrl: './navBar.component.html',
  styleUrl: './navBar.component.scss',
})
export class NavBarComponent implements OnInit {
  userData = signal<UserDTO | null>(null);

  langClick = false;
  darkMode = false;
  userItems: MenuItem[] | undefined;

  // @ViewChild('menu') menu!: Menu;
  // menuItems: MenuItem[] = [
  //   {
  //     label: 'Home',
  //     // icon: 'fa-solid fa-home text-pink-500',
  //     routerLink: '/home',
  //     styleClass: 'py-2 paragraph-text',
  //     routerLinkActive: 'text-primary-color',
  //   },
  //   {
  //     label: 'Categories',
  //     // icon: 'fa-solid fa-list text-pink-500',
  //     routerLink: '/product-list',
  //     styleClass: 'py-2 paragraph-text',
  //     routerLinkActive: 'text-primary-color',
  //   },
  //   {
  //     label: 'About',
  //     // icon: 'fa-solid fa-circle-info text-pink-500',
  //     routerLink: '/about',
  //     styleClass: 'py-2 paragraph-text',
  //     routerLinkActive: 'text-primary-color',
  //   },
  //   {
  //     label: 'Contact',
  //     // icon: 'fa-solid fa-envelope text-pink-500',
  //     routerLink: '/contact',
  //     styleClass: 'py-2 paragraph-text',
  //     routerLinkActive: 'text-primary-color',
  //   },
  // ];
  constructor(
    private _themeService: ThemeService,
    private _MyTranslateService: MyTranslateService,
    private _AuthService: AuthService
  ) {}
  /**
   * Toggles the mobile menu
   * @param event - The click event that triggered the toggle
   */
  // toggleMenu(event: Event) {
  //   this.menu.toggle(event);
  // }
  ngOnInit() {
    //initial theme
    this._themeService.initialTheme();
    this.getUserData();
    this.setUserMenueItems();
  }
  setUserMenueItems() {
    this.userItems = [
      {
        label: `${this.userData()?.firstName}${this.userData()?.lastName}`,

        items: [
          {
            separator: true,
          },
          {
            label: 'My Profile',
            icon: 'pi pi-user',
            routerLink: '',
          },
          {
            label: 'My Addresses',
            icon: 'pi pi-home',
          },
          {
            label: 'My Orders',
            icon: 'pi pi-save',
            routerLink: '',
          },
          {
            separator: true,
          },
          {
            label: 'Dashboard',
            icon: 'pi pi-cog',
          },
          {
            separator: true,
          },
          {
            label: 'Log out',
            icon: 'pi pi-sign-out',
          },
        ],
      },
      // {
      //   separator: true,
      //   styleClass: 'line',
      // },
      // {
      //   icon: 'pi pi-heart',
      //   badge:'2',
      //   expanded:true,
      // },
      // {
      //   icon: 'pi pi-shopping-cart',
      //    badge:'2',
      // },
      // {
      //   icon: 'pi pi-bell',
      //    badge:'2',
      // },
    ];
  }

  getUserData() {
    this.userData.set(this._AuthService.getUser());
    console.log(this.userData());
  }
  toggleDarkMode() {
    this._themeService.toggleTheme();
  }

  // visible = false;

  // position:
  //   | 'left'
  //   | 'right'
  //   | 'top'
  //   | 'bottom'
  //   | 'center'
  //   | 'topleft'
  //   | 'topright'
  //   | 'bottomleft'
  //   | 'bottomright' = 'topleft';

  // showDialog(
  //   position:
  //     | 'left'
  //     | 'right'
  //     | 'top'
  //     | 'bottom'
  //     | 'center'
  //     | 'topleft'
  //     | 'topright'
  //     | 'bottomleft'
  //     | 'bottomright'
  // ) {
  //   this.position = 'topleft';
  //   this.visible = true;
  // }

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
