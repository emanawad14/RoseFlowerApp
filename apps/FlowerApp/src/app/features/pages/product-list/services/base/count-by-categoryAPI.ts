import { Observable } from 'rxjs';
import { CheckboxOption } from '../../interfaces/checbox-options';
 

export interface CountByCategoryApiInterface {
  getCountByCategory(): Observable<CheckboxOption[]>;
}
