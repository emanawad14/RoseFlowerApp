import { Observable } from 'rxjs';
import { CheckboxOption } from '../../interfaces/checbox-options';

export interface OccasionApiInterface {
  getAllOccasions(): Observable<CheckboxOption[]>;
}
