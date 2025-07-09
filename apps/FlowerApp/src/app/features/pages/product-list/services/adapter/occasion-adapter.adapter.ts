import { Injectable } from '@angular/core';
import { Occasion, OccasionResponseInterface } from '../../interfaces/occasion';
import { Adapter } from 'apps/FlowerApp/src/app/shared/interfaces/adapter';
import { CheckboxOption } from '../../interfaces/checbox-options';

@Injectable({
  providedIn: 'root',
})
export class OccasionAdapter implements Adapter {
  constructor() {}
  adapt(data: OccasionResponseInterface): CheckboxOption[] {
    return data.occasions
      .filter((item) => item.productsCount > 0)
      .map((occasion) => ({
        _id: occasion._id,
        label: occasion.name,
        value: occasion.name,
        count: occasion.productsCount,
      }));
  }
}
