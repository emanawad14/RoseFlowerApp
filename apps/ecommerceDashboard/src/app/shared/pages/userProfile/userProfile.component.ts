import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import intlTelInput from 'intl-tel-input';

import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FileUploadModule, ButtonModule],
  templateUrl: './userProfile.component.html',
  styleUrl: './userProfile.component.scss',
})
export class UserProfileComponent implements AfterViewInit {
  ngAfterViewInit() {
    const input = document.querySelector('#phone') as HTMLInputElement;
    intlTelInput(input, {
      initialCountry: 'eg',
      // @ts-expect-error: 'utilsScript' is not in the type definition but required by the library
      utilsScript:
        'https://cdn.jsdelivr.net/npm/intl-tel-input/build/js/utils.js',
    });
  }

  onUpload(event: any) {
    const file = event.files[0];
    console.log('Uploaded file:', file);
    // You can preview or upload to server here
  }
}
