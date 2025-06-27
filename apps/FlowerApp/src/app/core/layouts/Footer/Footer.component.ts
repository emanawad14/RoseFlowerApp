import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule , InputTextModule,
    ButtonModule,TranslatePipe],
  templateUrl: './Footer.component.html',
  styleUrl: './Footer.component.scss',
})
export class FooterComponent {
  constructor(public _TranslateService: TranslateService) {}

}
