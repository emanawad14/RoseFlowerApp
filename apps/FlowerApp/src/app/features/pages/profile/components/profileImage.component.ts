import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-profile-image',
  imports: [CommonModule, AvatarModule],
  templateUrl: './profileImage.component.html',
  styleUrl: './profileImage.component.scss',
})
export class ProfileImageComponent {
  @Input({required:true}) imgSrc?:string;
  uploadImage() {}
}
