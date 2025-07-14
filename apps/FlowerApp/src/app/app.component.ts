import { ThemeService } from './core/services/theme-service.service';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavBarComponent } from "./core/layouts/navBar/navBar.component";
import { FooterComponent } from "./core/layouts/Footer/Footer.component";

@Component({
  imports: [RouterModule, ButtonModule, NavBarComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FlowerApp';
}
