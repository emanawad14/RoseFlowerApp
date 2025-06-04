import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MenuModule, Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../services/myTranslate/my-translate.service';

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
    TranslatePipe
  ],
  templateUrl: './navBar.component.html',
  styleUrl: './navBar.component.scss',
})
export class NavBarComponent {



  
   
  private readonly myTranslate=inject(MyTranslateService);
  private readonly TranslateService=inject(TranslateService);



currentLanguage(lang:string):boolean{
 return  this.TranslateService.currentLang  === lang
}
  
  //************          language   ******************/ 
  change(lang:string):void
  {
     this.myTranslate.changeTranslateLange(lang)
  }


  

//**************************************************** */
  @ViewChild('menu') menu!: Menu;

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'fa-solid fa-home text-pink-500',
      routerLink: '/home',
    },
    {
      label: 'Categories',
      icon: 'fa-solid fa-list text-pink-500',
      routerLink: '/categories',
    },
    {
      label: 'About',
      icon: 'fa-solid fa-circle-info text-pink-500',
      routerLink: '/about',
    },
    {
      label: 'Contact',
      icon: 'fa-solid fa-envelope text-pink-500',
      routerLink: '/contact',
    },
  ];

  /**
   * Toggles the mobile menu
   * @param event - The click event that triggered the toggle
   */
  toggleMenu(event: Event) {
    this.menu.toggle(event);
  }
}
