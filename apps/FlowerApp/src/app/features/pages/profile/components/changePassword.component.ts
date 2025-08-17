import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnComponent } from "apps/FlowerApp/src/app/shared/components/ui/primary-btn.component";
import { GlobalInputComponent } from "apps/FlowerApp/src/app/shared/components/ui/globalInput.component";

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, PrimaryBtnComponent, GlobalInputComponent],
  templateUrl: './changePassword.component.html',
  styleUrl: './changePassword.component.scss',
})
export class ChangePasswordComponent {}
