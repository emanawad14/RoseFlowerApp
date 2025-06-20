import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../services/myTranslate/my-translate.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule , InputTextModule, TranslatePipe,
    ButtonModule,],
  templateUrl: './Footer.component.html',
  styleUrl: './Footer.component.scss',
})
export class FooterComponent {
constructor(public translate: TranslateService) {}


}
