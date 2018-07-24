import { AbstractControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

export class ValidateEmailNotTaken {
  static createValidator(apiService: ApiService) {
    return (control: AbstractControl) => {
      return apiService.userEmailExists(control.value).pipe(map((res: boolean) => {
        return !res ? null : { emailTaken: true };
      }));
    };
  }
}
