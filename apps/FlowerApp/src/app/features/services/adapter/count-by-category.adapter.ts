import { Injectable } from '@angular/core';
import { Adapter } from '../../../shared/interfaces/adapter';
import { CheckboxOption } from '../../interfaces/checbox-options';
import {
  Countbycategory,
  CountbycategoryResponse,
} from '../../interfaces/countbycategory';

@Injectable({
  providedIn: 'root',
})
export class CountbycategoryAdapter implements Adapter {
  constructor() {}
  adapt(data: CountbycategoryResponse): CheckboxOption[] {
    return data.categoryProductCount
      .filter((item) => !!item.category)
      .map((data: Countbycategory) => ({
        _id: data._id,
        label: data.category,
        value: data.category,
        count: data.productCount,
      }));
  }
}
