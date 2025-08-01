import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Feature } from '../../interfaces/feature';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-avatar-features',
  imports: [CommonModule, AvatarModule, AvatarGroupModule],
  templateUrl: './avatar-features.component.html',
  styleUrl: './avatar-features.component.scss',
})
export class AvatarFeaturesComponent {
  @Input({ required: true }) feature!: Feature;
  currentLang: string = 'en';
  constructor(public _TranslateService: TranslateService) {
    this.currentLang = this._TranslateService.currentLang;
  }
}
