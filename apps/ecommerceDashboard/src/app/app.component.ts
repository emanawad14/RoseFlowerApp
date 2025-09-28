import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { StepperComponent } from "./shared/components/stepper/stepper.component";
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";

@Component({
  imports: [ RouterModule, StepperComponent, SidebarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ecommerceDashboard';
}
