import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthApiService } from '@rose-flower/auth-api';

import { GlobalInputComponent } from '../../../shared/components/ui/globalInput.component';
import { FieldErrorComponent } from '../../../shared/components/business/fieldError/field-error.component';
import { PrimaryBtnComponent } from '../../../shared/components/ui/primary-btn.component';
import { ErrorComponent } from '../../../shared/components/ui/error/error.component';
import { Router, RouterLink } from '@angular/router';
import { SharedDataService } from '../../../shared/services/shared-data.service';

@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    GlobalInputComponent,
    FieldErrorComponent,
    PrimaryBtnComponent,
    ErrorComponent,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  resetPasswordForm!: FormGroup;
  isLoading: boolean = false;
  backendError: string = '';
  private readonly destroy$ = new Subject<void>();
  private readonly _authApiService = inject(AuthApiService);
  private readonly _router = inject(Router);
  private readonly _sharedDataService = inject(SharedDataService);
  email = this._sharedDataService.getEmail();
  constructor() {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
    });
  }

  setNewPassword() {
    console.log(this.resetPasswordForm.value);
    if (this.resetPasswordForm.invalid || this.isLoading) {
      this.resetPasswordForm.markAllAsTouched();
    } else {
      const payload = {
        email: this.email,
        newPassword: this.resetPasswordForm.value.newPassword,
        password: this.resetPasswordForm.value.password,
      };
      this.isLoading = true;
      console.log(this.resetPasswordForm.value);
      this._authApiService
        .resetPassword(payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            console.log(res);
            this.isLoading = false;
            this._sharedDataService.clearEmail();
            this._router.navigate(['/auth/login']);
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
