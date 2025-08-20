import { Component, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalInputComponent } from 'apps/FlowerApp/src/app/shared/components/ui/globalInput.component';
import { PrimaryBtnComponent } from 'apps/FlowerApp/src/app/shared/components/ui/primary-btn.component';
import { ProfileImageComponent } from './profileImage.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProfileService } from '../services/profile.service';
import { User } from '../types/userData.interface';
import { Country } from 'apps/FlowerApp/src/app/shared/interfaces/country.interface';
import {
  getCountryCode,
  getLocalNumber,
  internationalPhoneValidator,
} from 'apps/FlowerApp/src/app/core/utills/app.utills';
import { Subject, takeUntil } from 'rxjs';
import { ToastService } from 'apps/FlowerApp/src/app/shared/services/toast.service';
import { ErrorComponent } from 'apps/FlowerApp/src/app/shared/components/ui/error/error.component';
import { FieldErrorComponent } from 'apps/FlowerApp/src/app/shared/components/business/fieldError/field-error.component';
import { AuthService } from 'apps/FlowerApp/src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'apps/FlowerApp/src/app/shared/components/ui/confirmDialog.component';

@Component({
  selector: 'app-my-account',
  imports: [
    CommonModule,
    GlobalInputComponent,
    PrimaryBtnComponent,
    ProfileImageComponent,
    ReactiveFormsModule,
    CascadeSelectModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ErrorComponent,
    FieldErrorComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './myAccount.component.html',
  styleUrl: './myAccount.component.scss',
})
export class MyAccountComponent implements OnInit, OnDestroy {
  accountForm!: FormGroup;
  userData?: User;
  backendError: string = '';
  selectedCountry = signal<Country>(ProfileService.countries[0]);
  phoneNumber = signal<string>('');
  @ViewChild(ConfirmDialogComponent) confirmDialog!: ConfirmDialogComponent;

  private destroy$ = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private _ProfileService: ProfileService,
    private _toastService: ToastService,
    private _AuthService: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.accountForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: ['', Validators.required],
      phone: ['', [Validators.required, internationalPhoneValidator]],
      gender: [{ value: this.userData?.gender ?? '', disabled: true }],
    });
    this.getUserData();
  }
  getUserData() {
    this._ProfileService
      .getLoggedUserData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.userData = res;
          this.setProfileFormData(res);
        },
        error: (err) => {
          //console.log(err.error.error);
          this._toastService.showError(err.error.error);
        },
      });
  }
  updateProfile() {
    const { firstName, lastName, phone, email } = this.accountForm.value;
    //console.log(this.accountForm.value);
    if (this.accountForm.valid) {
      this._ProfileService
        .updateProfile({ firstName, lastName, phone, email })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.userData = res;
            this._toastService.showSuccess('profile Updated');
            this.setProfileFormData(res);
          },
          error: (err) => {
            // console.log(err.error.error);
            this._toastService.showError(err.error.error);
            this.backendError = err.error['error'];
          },
        });
    } else {
      this._toastService.showError('invalid Form Data');
    }
  }
  setProfileFormData(data: User) {
    this.accountForm.patchValue(data);
    this.selectedCountry.set(
      ProfileService.countries.filter(
        (country) => country.dial == getCountryCode(data.phone)
      )[0]
    );
    this.phoneNumber.set(getLocalNumber(data.phone)!);
  }
  deleteAccount() {
    this.confirmDialog.confirmDialog(
      'Are you sure you want to delete your account?',
      () => {
        // confirmed: handle deletion logic
        this._ProfileService
          .deleteAccount()
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res) => {
              this._AuthService.clearUser();
              this._toastService.showSuccess(
                'Deleted Your Accound Successfully'
              );
              this._router.navigate(['/home']);
            },
            error: (err) => {
              this._toastService.showError(err.error.error);
              //console.log(err.error.error);
            },
          });
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete(); // Completes the subject
  }
}
