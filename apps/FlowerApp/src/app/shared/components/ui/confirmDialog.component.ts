import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-confirm-dialog',
  imports: [CommonModule, ConfirmDialogModule, ButtonModule, ToastModule],
  templateUrl: './confirmDialog.component.html',
  styleUrl: './confirmDialog.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class ConfirmDialogComponent {
  @Input() deleteAccount: boolean = false;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  confirmDialog(confiemMessage: string, onConfirm: () => void) {
    this.confirmationService.confirm({
      // target: event.target as EventTarget,
      message: confiemMessage,
      header: ' ',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Nope, not doing it',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Yes,Delete',
        severity: 'danger',
      },

      accept: onConfirm,
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
