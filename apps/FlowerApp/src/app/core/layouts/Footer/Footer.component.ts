import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-footer',
  imports: [CommonModule , InputTextModule,
    ButtonModule,],
  templateUrl: './Footer.component.html',
  styleUrl: './Footer.component.scss',
})
export class FooterComponent {}
