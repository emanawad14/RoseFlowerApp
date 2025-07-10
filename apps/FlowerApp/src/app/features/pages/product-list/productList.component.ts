import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../../core/layouts/navBar/navBar.component';
 import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { GlobalInputComponent } from '../../../shared/components/ui/globalInput.component';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CheckboxOption } from './interfaces/checbox-options';
import { catchError, Subscription, throwError } from 'rxjs';
import { CountByCategoryService } from './services/count-by-category.service';
import { OccasionService } from './services/occasion.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { TranslatePipe } from '@ngx-translate/core';
import { SharedProductsComponent } from '../../../shared/components/business/sharedProducts.component';
import { Store } from '@ngrx/store';
import { Product } from '../../interfaces/products';
import { loadProducts } from '../../../Store/actions/products.action';
import {
  getErrorMsg,
  getProductsList,
} from '../../../Store/selectors/products.selectors';
import { FooterComponent } from '../../../core/layouts/Footer/Footer.component';
import { ErrorResponseDTO } from './interfaces/error';
import { PrimaryBtnComponent } from '../../../shared/components/ui/primary-btn.component';
import { GlobalCkeckboxGroupComponent } from './components/business/global-ckeckbox-group.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    ReactiveFormsModule,
    GlobalInputComponent,
    InputTextModule,
    CheckboxModule,
    CardModule,
    ButtonModule,
    FormsModule,
    RatingModule,
    SliderModule,
    TranslatePipe,
    SharedProductsComponent,
    FooterComponent,
    PrimaryBtnComponent,
    GlobalCkeckboxGroupComponent
],
  templateUrl: './productList.component.html',
  styleUrl: './productList.component.scss',
})
export class ProductListComponent implements OnInit, OnDestroy {
  filtersForm: FormGroup;
  subscription = new Subscription();
  categoriesOptions: CheckboxOption[] = [];
  brandsOptions: CheckboxOption[] = [];
  priceRange: number[] = [0, 80];

  rateAvg: CheckboxOption[] = [
    { label: '5', value: '5' },
    { label: '4', value: '4' },
    { label: '3', value: '3' },
    { label: '2', value: '2' },
    { label: '1', value: '1' },
  ];

  sizeOptions: CheckboxOption[] = [
    { label: 'Extra Small', value: 'XS' },
    { label: 'Small', value: 'S' },
    { label: 'Medium', value: 'M' },
    { label: 'Large', value: 'L' },
    { label: 'Extra Large', value: 'XL' },
  ];

  salesOptions: CheckboxOption[] = [
    { label: 'On Sale', value: 'On Sale', count: 42 },
    { label: 'In Stock', value: 'In Stock', count: 15 },
    { label: 'Out Of Stock', value: 'Out Of Stock', count: 28 },
    { label: 'Discount', value: 'Discount', count: 36 },
  ];

  productsList: Product[] = [];
  errorMsg = '';
  store = inject(Store);

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
      priceRange: [[0, 80]],
      rateAvg: [[]],
    });
  }

  ngOnInit(): void {
    this.getFiltersObject();
    this.getCategoryByCount();
    this.getBrands();
    this.getAllProducts();
  }

  // Reset the form to initial values
  resetForm(): void {
    this.filtersForm.setValue({
      title: '',
      categories: [],
      brands: [],
      sizes: [],
      sales: [],
      priceRange: [0, 80],
      rateAvg: [],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCategoryByCount() {
    const sub = this._CountByCategoryService
      .getCountByCategory()
      .pipe(
        catchError((error) => {
          console.error('HTTP Error:', error);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (res) => {
          this.categoriesOptions = res;
        },
      });
    this.subscription.add(sub);
  }
  ///occassions//////
  getBrands() {
    const sub = this._OccasionService.getAllOccasions().subscribe({
      next: (res) => {
        this.brandsOptions = res;
      },
      error: (err: ErrorResponseDTO) => {
        console.log(err.message);
      },
    });
    this.subscription.add(sub);
  }

  getFiltersObject() {
    const sub = this.filtersForm.valueChanges.subscribe((values) => {
      // console.log('Form values changed:', values);
    });
    this.subscription.add(sub);
  }

  getAllProducts() {
    this.store.dispatch(loadProducts());

    const sub1 = this.store.select(getErrorMsg).subscribe((res) => {
      this.errorMsg = res;
    });

    const sub2 = this.store.select(getProductsList).subscribe((products) => {
      this.productsList = products;
    });

    this.subscription.add(sub1);
    this.subscription.add(sub2);
  }
}
