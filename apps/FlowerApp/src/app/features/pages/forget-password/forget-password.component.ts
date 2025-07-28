import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApiService } from '@rose-flower/auth-api';
import { GlobalInputComponent } from '../../../shared/components/ui/globalInput.component';
import { FieldErrorComponent } from '../../../shared/components/business/fieldError/field-error.component';
import { PrimaryBtnComponent } from '../../../shared/components/ui/primary-btn.component';
import { RouterLink } from '@angular/router';
import { ErrorComponent } from '../../../shared/components/ui/error/error.component';
import { VerifyCodeComponent } from '../verify-code/verify-code.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { SharedDataService } from '../../../shared/services/shared-data.service';

@Component({
  selector: 'app-forget-password',
  imports: [
    CommonModule,
    GlobalInputComponent,
    FieldErrorComponent,
    PrimaryBtnComponent,
    RouterLink,
    ErrorComponent,
    ReactiveFormsModule,
    VerifyCodeComponent,
    ResetPasswordComponent,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  forgetPasswordForm!: FormGroup;
  isLoading: boolean = false;
  isEmailSend: boolean = false;
  isCodeSend: boolean = false;
  backendError: string = '';
  private readonly _authApiService = inject(AuthApiService);
  private readonly _sharedDataService = inject(SharedDataService);
  ngOnInit(): void {
    this.initForm();
    console.log(this.isCodeSend);
  }

  initForm(): void {
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  sendEmail() {
    if (this.forgetPasswordForm.invalid || this.isLoading) {
      this.forgetPasswordForm.markAllAsTouched();
    } else {
      this.isLoading = true;

      console.log(this.forgetPasswordForm.value);
      const email = this.forgetPasswordForm.value.email;

      this._sharedDataService.setEmail(email);
      this._authApiService
        .forgetPassword(this.forgetPasswordForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            console.log(res);
            this.isLoading = false;
            this.isEmailSend = true;
            // this._router.navigate(['/auth/verify-code']);
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        });
    }
  }
  onCodeVerified(success: boolean) {
    this.isEmailSend = !success;
    this.isCodeSend = success;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
