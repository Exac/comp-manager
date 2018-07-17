import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });

    // auto-fill email if sent (http://0.0.0.0:4200/login;email=X@example.ca)
    this.form.controls.email.setValue(this.route.snapshot.params.email);
  }

  ngAfterViewInit() {
    if (this.route.snapshot.params.message) {
      this.message(this.route.snapshot.params.message)
    }
  }

  public login() {
    // Send username / password to server to be challenged.
    this.apiService.login(this.form.controls.email.value, this.form.controls.password.value).subscribe(
      (res: boolean/*{ 'success': boolean, 'user'?: User }*/) => {
        if (res/*.success*/) {
          this.router.navigate(['/choose-activity'], {})
        } else {
          console.log('Login Failed')
          // disable form for 1500ms so user doesn't accidentally send attempts while
          // has temporarily locaked their account
          this.form.controls.password.setValidators([Validators.required, Validators.maxLength(0)])
          this.form.controls.password.updateValueAndValidity();
          this.form.controls.password.setErrors({ 'wait': true });
          setTimeout(() => {
            this.form.controls.password.setValidators([Validators.required])
            this.form.controls.password.setErrors({ 'wait': false })
            this.form.controls.password.setValue('')
          }, 1500)
        }
      }, (err) => {
        console.log('whoops:', err)
      }
    )
  }

  public message(message: string) {
    setTimeout(() => {
      this.snackBar.open(message, 'Notice', { duration: -1 })
    })
  }

}
