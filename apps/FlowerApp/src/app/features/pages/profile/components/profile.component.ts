import { Component, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountComponent } from './myAccount.component';
import { ChangePasswordComponent } from './changePassword.component';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AuthApiService } from '@rose-flower/auth-api';
import { AuthService } from 'apps/FlowerApp/src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'apps/FlowerApp/src/app/shared/services/toast.service';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmDialogComponent } from 'apps/FlowerApp/src/app/shared/components/ui/confirmDialog.component';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    MyAccountComponent,
    ChangePasswordComponent,
    DrawerModule,
    ButtonModule,
    ConfirmDialogComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnDestroy {
  @ViewChild(ConfirmDialogComponent) confirmDialog!: ConfirmDialogComponent;

  activeView: 'account' | 'password' = 'account';
  private destroy$ = new Subject<void>();
  constructor(
    private _AuthApiService: AuthApiService,
    private _AuthService: AuthService,
    private _router: Router,
    private _toastService: ToastService
  ) {}

  logout() {
    this.confirmDialog.confirmDialog('Are You sure you want to logout', () => {
      // confirmed: handle deletion logic
      this._AuthApiService
        .logout()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this._AuthService.clearUser();
            this._toastService.showSuccess('logout');
            this._router.navigate(['/home']);
          },
          error: (err) => {
            this._toastService.showError(err.error.error);
            console.log(err.error.error);
          },
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
