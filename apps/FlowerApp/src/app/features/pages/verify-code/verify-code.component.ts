import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
import { PrimaryBtnComponent } from '../../../shared/components/ui/primary-btn.component';
import { ErrorComponent } from '../../../shared/components/ui/error/error.component';

@Component({
  selector: 'app-verify-code',
  imports: [
    CommonModule,
    GlobalInputComponent,
    FieldErrorComponent,
    RouterLink,
    PrimaryBtnComponent,
    ErrorComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss',
})
export class VerifyCodeComponent implements OnInit, OnDestroy {
  verifyCodeForm!: FormGroup;
  isLoading: boolean = false;
  backendError: string = '';
  @Output() codeVerified = new EventEmitter<boolean>();
  private readonly destroy$ = new Subject<void>();
  private readonly _authApiService = inject(AuthApiService);
  private readonly _router = inject(Router);
  constructor() {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.verifyCodeForm = new FormGroup({
      resetCode: new FormControl(null, [Validators.required]),
    });
  }

  verifyCode() {
    if (this.verifyCodeForm.invalid || this.isLoading) {
      this.verifyCodeForm.markAllAsTouched();
    } else {
      this.isLoading = true;
      console.log(this.verifyCodeForm.value);
      this._authApiService
        .verifyCode(this.verifyCodeForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res: any) => {
            console.log(res);
            this.isLoading = false;
            this.codeVerified.emit(true);
            // this._router.navigate(['/auth/reset-password']);
          },
          error: (err: any) => {
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
