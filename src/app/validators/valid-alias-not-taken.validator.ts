import { AbstractControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

export class ValidateAliasNotTaken {
  static createValidator(apiService: ApiService) {
    return (control: AbstractControl) => {
      return apiService.userAliasExists(control.value).pipe(map((res: boolean) => {
        return !res ? null : { aliasTaken: true };
      }));
    }
  }
}

