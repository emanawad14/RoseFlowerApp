import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../../../shared/pages/userSideBar/sideBar.component';
import { UserProfileComponent } from '../../../shared/pages/userProfile/userProfile.component';
import { NavbarComponent } from '../../../shared/pages/userNavBar/navbar.component';
import { BootomBarComponent } from '../../../shared/pages/bootomBar/bootomBar.component';

@Component({
  selector: 'app-user-board',
  imports: [
    CommonModule,
    SideBarComponent,
    UserProfileComponent,
    NavbarComponent,
    BootomBarComponent,
  ],
  templateUrl: './userBoard.component.html',
  styleUrl: './userBoard.component.scss',
})
export class UserBoardComponent {}
