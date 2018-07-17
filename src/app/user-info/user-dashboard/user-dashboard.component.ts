import { Component, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  animations: [
    trigger('dashboardState', [
      state('active', style({
        opacity: 1.0
      })),
      state('inactive', style({
        opacity: 0.5
      })),
      state('void', style({
        opacity: 0
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
      transition('void => active', animate('100ms ease-in')),
      transition('active => void', animate('100ms ease-out')),
    ])
  ]
})
export class UserDashboardComponent implements OnDestroy {

  public dashboardState: "active" | "inactive" | "void" = 'void';

  constructor() { }

  toggleUserDashboard() {
    const dashElem: HTMLElement = document.getElementById("userD");
    // When element is created, it is void and is hidden. Make it visible to start
    dashElem.style.visibility = this.dashboardState === 'void' ? 'visible' : 'hidden';
    // Toggle between `active` and `void` states
    this.dashboardState = this.dashboardState === 'active' ? 'void' : 'active';
  }

  ngOnDestroy() {

  }

}
