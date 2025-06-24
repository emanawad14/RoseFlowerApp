import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../core/layouts/navBar/navBar.component';
import { GlobalCkeckboxComponent } from '../../shared/components/ui/globalCkeckbox.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { GlobalInputComponent } from '../../shared/components/ui/globalInput.component';
import { Size } from '../interfaces/size';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
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
export class ProductListComponent implements OnInit {
  filteredObject: any;
  filtersForm: FormGroup;
  sizes: Size[] = [
    { id: '1', size: 'Extra Small' },
    { id: '2', size: 'Small' },
    { id: '3', size: 'Medium' },
    { id: '4', size: 'Large' },
    { id: '5', size: 'Extra Large' },
  ];

  constructor(private _fb: FormBuilder) {
    this.filtersForm = this._fb.group({
      title: [''],
      categories: [[]],
      sizes: this._fb.array(
        this.sizes.map((control) => new FormControl(false))
      ),
    });
  }

  ngOnInit(): void {}

  sizeSelected(size: Size) {
   // console.log('size selected', size);
    //console.log(this.filtersForm.value);
  }
  onSubmit() {
    // this.filteredObject = this.filtersForm.value;
    // // Filter out the unselected ids
    // this.filteredObject.sizes = this.filteredObject.sizes
    //   .map((checked: boolean, index: number) =>
    //     checked ? this.sizes[index].size : null
    //   )
    //   .filter((value: Size) => value !== null);
    // Do something with the result

    console.log(this.filtersForm.value);
  }
}
