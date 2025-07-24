 import { AuthApiService } from '@rose-flower/auth-api';
import { InputTextModule } from 'primeng/inputtext';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
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
import { TokenService } from '../../services/token.service';
import { PrimaryBtnComponent } from '../../../shared/components/ui/primary-btn.component';
import { GlobalInputComponent } from '../../../shared/components/ui/globalInput.component';
import { AuthService } from '../../../shared/services/auth.service';
import { LoginDTO } from 'auth-api/src/lib/auth-api/interfaces/login.dto';

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
    PrimaryBtnComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private destroy$ = new Subject<void>();
  loginForm!: FormGroup; // FormGroup defined
  constructor(
    private _fb: FormBuilder,
    private _authApiService: AuthApiService,
    private _tokenService: TokenService,
    private _router: Router,
    private _AuthService: AuthService
  ) {}
  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          ),
        ],
      ],
    });
  }
  backendError: string = '';
  // loginForm = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(
  //       /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  //     ),
  //   ]),
  // });

  onSubmit() {
    this._authApiService
      .login(this.loginForm.value as LoginDTO)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res.error);
          if (res.message == 'success') {
            this._tokenService.setToken(res.token);
            this._AuthService.setUser(res.user);
            this._router.navigate(['/home']);
          }
          // else {
          //   this.backendError?.push(res.error!);
          // }
        },
        error: (err) => {
          console.log(err.error['error']);

          this.backendError = err.error['error'];
        },
      });
    console.warn(this.loginForm.value);
  }

  ngOnDestroy() {
    this.destroy$.complete(); // Completes the subject
  }
}
