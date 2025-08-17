import { Component, OnDestroy, OnInit, signal } from '@angular/core';
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
  ],
  templateUrl: './myAccount.component.html',
  styleUrl: './myAccount.component.scss',
})
export class MyAccountComponent implements OnInit, OnDestroy {
  accountForm!: FormGroup;
  userData?: User;
  selectedCountry = signal<Country>(ProfileService.countries[0]);
  phoneNumber = signal<string>('');
  private destroy$ = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private _ProfileService: ProfileService
  ) {}

  ngOnInit() {
    this.accountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', [Validators.required, internationalPhoneValidator]],
      gender: [''],
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
          console.log(err.error.error);
        },
      });
  }
  updateProfile() {
    const { firstName, lastName, phone, email } = this.accountForm.value;
    console.log(this.accountForm.value);
    if (this.accountForm.valid) {
      this._ProfileService
        .updateProfile({ firstName, lastName, phone, email })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.userData = res;
            this.setProfileFormData(res);
          },
          error: (err) => {
            console.log(err.error.error);
          },
        });
    } else {
      console.log('not valid');
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
  deleteAccount() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete(); // Completes the subject
  }
}
