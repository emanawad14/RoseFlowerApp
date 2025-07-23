import { InputTextModule } from 'primeng/inputtext';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ErrorComponent } from '../../../shared/components/ui/error/error.component';
import { AuthApiService } from '../../../shared/auth/auth-api.service';
import { TokenService } from '../../services/token.service';
import { LoginDTO } from '../../../shared/auth/interfaces/login.dto';
import { PrimaryBtnComponent } from "../../../shared/components/ui/primary-btn.component";
import { GlobalInputComponent } from "../../../shared/components/ui/globalInput.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    CommonModule,
    ErrorComponent,
    RouterModule,
    PrimaryBtnComponent,
    GlobalInputComponent,
    PrimaryBtnComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private destroy$ = new Subject<void>();

  constructor(
    private _authApiService: AuthApiService,
    private _tokenService: TokenService,
    private _router: Router
  ) {}
  backendError: string | undefined | null = '';
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      ),
    ]),
  });
  onSubmit() {
    this._authApiService
      .login(this.loginForm.value as LoginDTO)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            this._tokenService.setToken(res.token);
            this._router.navigate(['/home']);
          } else {
            this.backendError = res.error?.message;
          }
        },
      });
    console.warn(this.loginForm.value);
  }

  ngOnDestroy() {
    this.destroy$.complete(); // Completes the subject
  }
}
