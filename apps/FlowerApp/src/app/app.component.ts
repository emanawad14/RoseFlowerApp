import { ThemeService } from './core/services/theme-service.service';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MainLayoutComponent } from "./shared/components/ui/main-layout.component";

@Component({
  imports: [RouterModule, ButtonModule, MainLayoutComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'FlowerApp';
}
