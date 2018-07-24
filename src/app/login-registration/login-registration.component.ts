import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateEmailNotTaken } from '../validators/valid-email-not-taken.validator';
import { Router } from '@angular/router';
import { ValidateAliasNotTaken } from '../validators/valid-alias-not-taken.validator';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginRegistrationComponent implements OnInit {
  fg1Email: FormGroup;
  fg2Alias: FormGroup;
  fg3Password: FormGroup;
  fg4Review: FormGroup;

  constructor(private _formBuilder: FormBuilder, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.fg1Email = this._formBuilder.group({
      fc1: ['', [Validators.required, ValidateEmailNotTaken], ValidateEmailNotTaken.createValidator(this.apiService)]
    });
    this.fg2Alias = this._formBuilder.group({
      fc2: ['', [Validators.required, ValidateAliasNotTaken], ValidateAliasNotTaken.createValidator(this.apiService)]
    });
    this.fg3Password = this._formBuilder.group({
      fc3: ['', Validators.required]
    });
    this.fg4Review = this._formBuilder.group({
      fc4: ['', Validators.required]
    });
  }

  private register() {
    const EMAIL = this.fg1Email.value.fc1;
    const ALIAS = this.fg2Alias.value.fc2;
    const PASSWORD = this.fg3Password.value.fc3;
    const REVIEW = this.fg4Review.value.fc4;

    this.apiService.createUser(EMAIL, ALIAS, PASSWORD)
      .subscribe((res: { success: boolean, message: string }) => {
        console.log(res);
        if (res.success) {
          this.router.navigate(['/login', { email: res.message }]);
        }
      });
  }

}
