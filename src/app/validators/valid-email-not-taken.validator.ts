import { AbstractControl } from '@angular/forms';
import { LoginRegistrationService } from '../login-registration.service';
import { map, catchError } from 'rxjs/operators';

export class ValidateEmailNotTaken {
  static createValidator(loginRegistrationService: LoginRegistrationService) {
    return (control: AbstractControl) => {
      return loginRegistrationService.userEmailExists(control.value).pipe(map((res: { success: boolean, message: string }) => {
        return !res.success ? null : { emailTaken: true };
      }));
    }
  }
}

