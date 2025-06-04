import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule , InputTextModule, TranslatePipe,
    ButtonModule,],
  templateUrl: './Footer.component.html',
  styleUrl: './Footer.component.scss',
})
export class FooterComponent {}
