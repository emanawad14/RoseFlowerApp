import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-alert-message',
  imports: [CommonModule, ToastModule],
  templateUrl: './alertMessage.component.html',
  styleUrl: './alertMessage.component.scss',
  providers: [MessageService],
})
export class AlertMessageComponent {
  constructor(private _MessageService: MessageService) {}
   displayAlert(alertMsg: string = 'Cart deleted') {
    this._MessageService.add({
      severity: 'info',
      summary: 'Confirmed',
      detail: alertMsg,
    });
  }
}
