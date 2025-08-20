import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ProfileService } from '../services/profile.service';
import { Subject, takeUntil } from 'rxjs';
import { LoadingComponent } from 'apps/FlowerApp/src/app/shared/components/ui/loading.component';
import { ToastService } from 'apps/FlowerApp/src/app/shared/services/toast.service';

@Component({
  selector: 'app-profile-image',
  imports: [CommonModule, AvatarModule, LoadingComponent],
  templateUrl: './profileImage.component.html',
  styleUrl: './profileImage.component.scss',
})
export class ProfileImageComponent implements OnInit, OnDestroy {
  @Input({ required: true }) imgSrc: any = null;
  //form!: FormGroup;
  formData = new FormData();
  loading: boolean = false;

  private destroy$ = new Subject<void>();
  constructor(
    private _ProfileService: ProfileService,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   photo: [null, Validators.required],
    // });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // ✅ Check type (only image/* allowed)
      if (!file.type.startsWith('image/')) {
        this._toastService.showInfo('Only image files are allowed!');
        return;
      }

      // ✅ (Optional) Check size (e.g. max 4 MB)
      if (file.size > 4 * 1024 * 1024) {
        this._toastService.showInfo('File size must be less than 4MB ');
        return;
      }
      // update form value
      // this.form.patchValue({ photo: file });
      // this.form.get('photo')?.updateValueAndValidity();

      ////update API////////////////
      this.uploadPhoto(file);
    }
  }
  uploadPhoto(file: any) {
    this.loading = true;
    this.formData.append('photo', file);
    this._ProfileService
      .updateProfilePhoto(this.formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.loading = false;
          console.log('Uploaded successfully', res);

          // Preview
          const reader = new FileReader();
          reader.onload = () => (this.imgSrc = reader.result);
          reader.readAsDataURL(file);
        },
        error: (err) => {
          this.loading = false;
          this._toastService.showError(err.error.error);
        },
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
