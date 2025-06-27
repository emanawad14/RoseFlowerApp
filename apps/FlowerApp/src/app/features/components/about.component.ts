import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { PrimaryBtnComponent } from '../../shared/components/ui/primary-btn.component';
import { TranslatePipe } from '@ngx-translate/core';
 @Component({
  selector: 'app-about',
  imports: [CommonModule, AvatarModule, AvatarGroupModule, PrimaryBtnComponent,TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
