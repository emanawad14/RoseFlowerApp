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
  @Output() btnClick = new EventEmitter(false);
  constructor(public translate: TranslateService) {}

  dispatchClick() {
    this.btnClick.emit(true);
  }
}
