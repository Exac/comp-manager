import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatStepperModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatSnackBarModule,
} from '@angular/material';
import { UserInfoModule } from './user-info/user-info.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';
import { LoginForgotComponent, LoginForgotDialogComponent } from './login-forgot/login-forgot.component';
import { LoginRecoveryComponent } from './login-recovery/login-recovery.component';
import { LoginTermsComponent } from './login-terms/login-terms.component';
import { ChooseActivityComponent } from './choose-activity/choose-activity.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    LoginRegistrationComponent,
    LoginForgotComponent,
    LoginForgotDialogComponent,
    LoginRecoveryComponent,
    LoginTermsComponent,
    ChooseActivityComponent
  ],
  entryComponents: [
    LoginForgotDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserInfoModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
