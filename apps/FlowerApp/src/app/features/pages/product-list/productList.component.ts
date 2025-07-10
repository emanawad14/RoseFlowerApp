import { Product } from './../../interfaces/products';
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
    GlobalCkeckboxGroupComponent,
  ],
  templateUrl: './productList.component.html',
  styleUrl: './productList.component.scss',
})
export class ProductListComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  filtersForm: FormGroup;
  subscription = new Subscription();
  categoriesOptions: CheckboxOption[] = [];
  brandsOptions: CheckboxOption[] = [];
  priceRange: number[] = [0,1000];

  rateAvg: CheckboxOption[] = [
    { _id: '5', label: '5', value: '5' },
    { _id: '4', label: '4', value: '4' },
    { _id: '3', label: '3', value: '3' },
    { _id: '2', label: '2', value: '2' },
    { _id: '1', label: '1', value: '1' },
  ];

  sizeOptions: CheckboxOption[] = [
    { _id: '5', label: 'Extra Small', value: 'XS' },
    { _id: 'sder', label: 'Small', value: 'S' },
    { _id: '4t65', label: 'Medium', value: 'M' },
    { _id: '54y4', label: 'Large', value: 'L' },
    { _id: 'tr', label: 'Extra Large', value: 'XL' },
  ];

  salesOptions: CheckboxOption[] = [
    { _id: '55', label: 'On Sale', value: 'On Sale', count: 42 },
    { _id: '54', label: 'In Stock', value: 'In Stock', count: 15 },
    { _id: '56', label: 'Out Of Stock', value: 'Out Of Stock', count: 28 },
    { _id: '57', label: 'Discount', value: 'Discount', count: 36 },
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
      priceRange: [this.priceRange],
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
    this.productsList = this.allProducts;
    this.setPriceRangValues();
    this.filtersForm.setValue({
      title: '',
      categories: [],
      brands: [],
      sizes: [],
      sales: [],
      priceRange: this.priceRange,
      rateAvg: [],
    });
  }
  setPriceRangValues() {
    this.priceRange[0] = Math.min(...this.allProducts.map((p) => p.price));
    this.priceRange[1] = Math.max(...this.allProducts.map((p) => p.price));
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
        //interceptor
        console.log(err.message);
      },
    });
    this.subscription.add(sub);
  }

  getFiltersObject() {
    const sub = this.filtersForm.valueChanges.subscribe((values) => {
      this.getFilteredProducts(values);
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
      this.allProducts = products;
      this.setPriceRangValues();
    });

    this.subscription.add(sub1);
    this.subscription.add(sub2);
  }

  getFilteredProducts(filteredObject: any) {
    console.log('this.allProducts', this.allProducts);
    this.productsList = JSON.parse(JSON.stringify(this.allProducts)); //different object oR arrary!!
    this.productsList = this.productsList.filter((product) => {
      const matchesTitle =
        !filteredObject.title ||
        product.title
          .toLowerCase()
          .includes(filteredObject.title.toLowerCase());

      const matchesCategory =
        !filteredObject.categories?.length ||
        filteredObject.categories.includes(product.category);

      const matchesBrand =
        !filteredObject.brands?.length ||
        filteredObject.brands.includes(product.occasion);

      const matchesRating =
        !filteredObject.rateAvg?.length ||
        filteredObject.rateAvg.includes(product.rateAvg?.toString());

      const matchesPrice =
        !filteredObject.priceRange?.length ||
        (product.price >= filteredObject.priceRange[0] &&
          product.price <= filteredObject.priceRange[1]) ||
        (product.priceAfterDiscount >= filteredObject.priceRange[0] &&
          product.priceAfterDiscount <= filteredObject.priceRange[1]);

      // ✅ Return true only if ALL filters match
      return (
        matchesTitle &&
        matchesCategory &&
        matchesBrand &&
        matchesRating &&
        matchesPrice
      );
    });
  }
}

// product.title.includes(filteredObject.title) ||
// filteredObject.categories.includes(product.category) ||
// filteredObject.brands.includes(product.occasion) ||
// filteredObject.rateAvg.includes(product.rateAvg.toString()) ||
// (filteredObject.priceRange[0] <= product.price &&
//   filteredObject.priceRange[1] >= product.price) ||
// (filteredObject.priceRange[0] <= product.priceAfterDiscount &&
//   filteredObject.priceRange[1] >= product.priceAfterDiscount)
