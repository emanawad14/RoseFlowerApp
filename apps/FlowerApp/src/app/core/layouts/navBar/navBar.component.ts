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
import { cartActions } from '../../../features/pages/cart/store/actions';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Address } from 'cluster';
import { GetAddressesComponent } from '../../../features/pages/address/components/getAddresses.component';
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
  providers: [DialogService],
})
export class NavBarComponent implements OnInit {
  private ref?: DynamicDialogRef;
  userData = signal<UserDTO | null>(null);

  langClick = false;
  darkMode = false;
  userItems: MenuItem[] | undefined;
  numberOfCartItems$!: Observable<number>;
  constructor(
    private _themeService: ThemeService,
    private _MyTranslateService: MyTranslateService,
    private _AuthService: AuthService,
    private store: Store,
    private _dialogService: DialogService
  ) {}

  ngOnInit() {
    //initial theme
    this._themeService.initialTheme();
    this.getUserData();
    this.setUserMenueItems();
    //get cart
    this.store.dispatch(cartActions['getLoggedUserCart']());
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

  openAddressDialog() {
    this.ref = this._dialogService.open(GetAddressesComponent, {
      header: '',
      width: '50vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: {
        // Pass input data here, for example:
        addresses: this._AuthService.getUser()?.addresses ?? [],
        // or pass entire user object, or addresses, etc.
      },
    });
    // this.ref.onClose.subscribe((address: Address) => {
    //   if (address) {
    //     console.log(address);
    //     // this._toastService.showInfo(`Selected address: ${address.city}`);
    //   }
    // });
  }
}
