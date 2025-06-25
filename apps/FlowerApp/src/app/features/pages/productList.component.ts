import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../core/layouts/navBar/navBar.component';
import { GlobalCkeckboxComponent } from '../../shared/components/ui/globalCkeckbox.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GlobalInputComponent } from '../../shared/components/ui/globalInput.component';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CheckboxOption } from '../interfaces/checbox-options';
import { catchError, Subscription, throwError } from 'rxjs';
import { CountByCategoryService } from '../services/count-by-category.service';
import { OccasionService } from '../services/occasion.service';
@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    NavBarComponent,
    GlobalCkeckboxComponent,
    ReactiveFormsModule,
    GlobalInputComponent,
    InputTextModule,
    CheckboxModule,
  ],
  templateUrl: './productList.component.html',
  styleUrl: './productList.component.scss',
})
export class ProductListComponent implements OnInit, OnDestroy {
  filteredObject: any;
  filtersForm: FormGroup;
  subscription = new Subscription();
  categoriesOptions: CheckboxOption[] = [];
  brandsOptions: CheckboxOption[] = [];
  // Size options array
  sizeOptions: CheckboxOption[] = [
    { label: 'Extra Small', value: 'XS', count: 12 },
    { label: 'Small', value: 'S', count: 24 },
    { label: 'Medium', value: 'M', count: 36 },
    { label: 'Large', value: 'L', count: 18 },
    { label: 'Extra Large', value: 'XL', count: 8 },
  ];

  // Sales options array
  salesOptions: CheckboxOption[] = [
    { label: 'On Sale', value: 'On Sale', count: 42 },
    { label: 'In Stock', value: 'In Stock', count: 15 },
    { label: 'Out Of Stock', value: 'Out Of Stock', count: 28 },
    { label: 'Discount', value: 'Discount', count: 36 },
  ];
  constructor(
    private _fb: FormBuilder,
    private _CountByCategoryService: CountByCategoryService,
    private _OccasionService: OccasionService
  ) {
    this.filtersForm = this._fb.group({
      title: [''],
      categories: [[]],
      brands: [[]],
      sizes: [[]],
      sales: [[]],
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    // Subscribe to form value changes if needed
    this.getFiltersObject();
    this.getCategoryByCount();
    this.getBrands();
  }
  getCategoryByCount() {
    const sub = this._CountByCategoryService.getCountByCategory().pipe(
    catchError(error => {
      console.error('HTTP Error:', error); // 👈 full object
      return throwError(() => error);      // rethrow or handle
    })
  ).subscribe({
      next: (res) => {
        console.log('res', res);
        this.categoriesOptions = res;
      },
    });
    this.subscription.add(sub);
  }
  getBrands() {
    const sub = this._OccasionService.getAllOccasions().subscribe({
      next: (res) => {
        this.brandsOptions = res;
      },
    });
    this.subscription.add(sub);
  }
  getFiltersObject() {
    const sub = this.filtersForm.valueChanges.subscribe((values) => {
      this.filteredObject = values;
      console.log('Form values changed:', values);
      // You can trigger filtering or other actions here
    });
    this.subscription.add(sub);
    return this.filteredObject;
  }
}
