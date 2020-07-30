import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

export interface Dummy {
  onSubmit(): Subject<FormGroup>;
}
