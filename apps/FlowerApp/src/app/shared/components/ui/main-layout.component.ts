import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../../../core/layouts/navBar/navBar.component";
import { FooterComponent } from "../../../core/layouts/Footer/Footer.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, NavBarComponent, FooterComponent, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
