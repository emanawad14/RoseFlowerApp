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
import { GlobalInputComponent } from '../../../shared/components/ui/globalInput.component';
import { Store } from '@ngrx/store';
import { selectNumberOfCartItems } from '../../../features/pages/cart/store/reducers';
import { Observable } from 'rxjs';
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
    GlobalInputComponent,
  ],
  templateUrl: './navBar.component.html',
  styleUrl: './navBar.component.scss',
})
export class NavBarComponent implements OnInit {
  userData = signal<UserDTO | null>(null);

  langClick = false;
  darkMode = false;
  userItems: MenuItem[] | undefined;
  numberOfCartItems$!: Observable<number>;
  constructor(
    private _themeService: ThemeService,
    private _MyTranslateService: MyTranslateService,
    private _AuthService: AuthService,
    private store: Store
  ) {}

  ngOnInit() {
    //initial theme
    this._themeService.initialTheme();
    this.getUserData();
    this.setUserMenueItems();
    this.numberOfCartItems$ = this.store.select(selectNumberOfCartItems);
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
