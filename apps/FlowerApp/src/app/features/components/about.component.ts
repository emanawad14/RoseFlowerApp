import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { PrimaryBtnComponent } from '../../shared/components/ui/primary-btn.component';
 @Component({
  selector: 'app-about',
  imports: [CommonModule, AvatarModule, AvatarGroupModule, PrimaryBtnComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
