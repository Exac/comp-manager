import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-login-forgot',
  templateUrl: './login-forgot.component.html',
  styleUrls: ['./login-forgot.component.scss']
})
export class LoginForgotComponent implements OnInit {
  public form: FormGroup;
  public email = "";
  static lfcEmail:string;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
    });
  }

  sendRecoveryEmail(x) {
    this.apiService.sendRecoveryEmail(this.form.controls.email.value).subscribe(
      (res: { success: boolean, message: string }) => {
        LoginForgotComponent.lfcEmail = this.form.controls.email.value;
        const dialogRef = this.dialog.open(LoginForgotDialogComponent, {
          width: '250px',
          disableClose: true,
          data: {
            success: res.success,
            title: res.success ? "Email Sent" : "Error Sending Email",
            message: res.message,
            button1text: "Login",
            button2text: "Close"
          }
        });
        dialogRef.afterClosed().subscribe(
          (res) => {
            if (res === 'close') this.form.controls.email.setValue(''); // if it is closed, wipe the input
          }
        );
      },
      (error) => {
        console.error(`Error ${error.status} sending recovery email:`, error);
      }
    )
  }

}

@Component({
  selector: 'login-forgot-dialog',
  templateUrl: 'login-forgot-dialog.component.html'
})
export class LoginForgotDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LoginForgotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(Router) private router: Router) {

  }

  on1Click(): void {
    // login
    this.router.navigate(['/login', { email: LoginForgotComponent.lfcEmail }]);
    this.dialogRef.close('login');
  }

  on2Click(): void {
    // close
    this.dialogRef.close('close');
  }

  getFailure(): boolean {
    return !this.data.success;
  }

  getSuccess(): boolean {
    return this.data.success;
  }

}