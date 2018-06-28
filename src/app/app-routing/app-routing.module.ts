import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { AppComponent } from '../app.component';
import { LoginRegistrationComponent } from '../login-registration/login-registration.component';
import { LoginForgotComponent } from '../login-forgot/login-forgot.component';
import { LoginRecoveryComponent } from '../login-recovery/login-recovery.component';
import { ChooseActivityComponent } from '../choose-activity/choose-activity.component';
import { PassportGuard } from '../passport-guard.service';

const ROUTES: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/registration', component: LoginRegistrationComponent },
  { path: 'login/forgot', component: LoginForgotComponent },
  { path: 'login/recovery', component: LoginRecoveryComponent },
  { path: 'choose-activity', component: ChooseActivityComponent, canActivate: [PassportGuard] },
  { path: 'welcome', component: WelcomeComponent }
];

@NgModule({
  exports: [RouterModule],
  providers: [PassportGuard],
  imports: [
    RouterModule.forRoot(
      ROUTES,
      { /*useHash: true,*/ enableTracing: true }
    )
  ],
})
export class AppRoutingModule { }
