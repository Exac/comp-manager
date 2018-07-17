import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import {
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
} from '@angular/material';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    UserInfoComponent,
  ],
  declarations: [
    UserInfoComponent,
  UserDashboardComponent]
})
export class UserInfoModule { }
