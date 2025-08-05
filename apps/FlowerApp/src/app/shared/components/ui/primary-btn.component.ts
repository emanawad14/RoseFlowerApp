import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-primary-btn',
  imports: [CommonModule, ButtonModule],
  templateUrl: './primary-btn.component.html',
  styleUrl: './primary-btn.component.scss',
})
export class PrimaryBtnComponent {
  @Input({ required: true }) labelName!: string;
  @Input({ required: false }) displayIcon = true;
  @Input({ required: false }) widthFull = false;
  @Input({ required: false }) disabled = false;
  @Output() btnClicked = new EventEmitter(false);
  @Input() type: 'button' | 'submit' = 'button';
  @Input() backgroundColor: string = ' var(--primary-btn-color)';
  @Input() colorText: string = 'var( --btn-text)';
  @Input() loading: boolean  =false;
  constructor(public translate: TranslateService) {}

  dispatchClick() {
    console.log('clicked');
    this.btnClicked.emit(true);
  }
}
