import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login-recovery',
  templateUrl: './login-recovery.component.html',
  styleUrls: ['./login-recovery.component.scss']
})
export class LoginRecoveryComponent implements OnInit {

  public form: FormGroup;
  public alias: string;
  private userid: number;
  private recovery: string;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: [null, [Validators.required]],
    });

    // get parameters from http://localhost:4200/login/recovery/?id=1001&recovery=209jn47j4n23y4f23x2t3482ghjjkvl9
    const params = {};
    location.search.substr(1).split('&').forEach(function (item) { params[item.split('=')[0]] = item.split('=')[1]; });

    this.userid = parseInt(params['id'], 10) || 0;
    this.recovery = params['recovery'] || '';

    if (this.userid === 0 || this.recovery === '') {
      const errormessage = `Missing id or recovery URL parameters`; // throw new Error(errormessage);
      console.error(errormessage);
    } else {
      this.apiService.getUserAlias(this.userid).subscribe(
        (res: string) => {
          this.alias = res;
        }, (err) => {

        }
      );
    }

    this.apiService.getUserAlias(this.userid).subscribe(
      (res: string) => {
        this.alias = res;
      }, (err) => { }
    );
  }

  updatePassword() {
    const pass = this.form.controls.password.value;
    if (pass.length >= 1) {
      this.apiService.updateUserPassword(this.form.controls.password.value, this.userid, this.recovery).subscribe(
        (res: { success: boolean }) => {
          if (res.success) {
            // Password has been updated, user has recovered their account! redirect to login page
            this.apiService.getUserEmail(this.userid).subscribe(
              (result: string) => {
                this.router.navigate(['/login', { email: result }]);
              }
            );
          }
        }, (err) => {

        }
      );
    }
  }

}
