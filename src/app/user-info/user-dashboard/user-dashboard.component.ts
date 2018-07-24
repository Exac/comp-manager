import { Component, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { inherits } from 'util';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  animations: [
    trigger('dashboardState', [
      state('active', style({
        opacity: 1.0,
        top: '80px',
        left: '16px',
        right: '16px',
        bottom: '16px',
        width: 'auto',
        minHeight: 'auto',
        height: 'calc(100vh - 97px)'
      })),
      state('inactive', style({
        opacity: 0.5
      })),
      state('void', style({
        opacity: 0,
        left: 'auto',
        right: 'auto'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
      transition('void => active', animate('100ms ease-in')),
      transition('active => void', animate('100ms ease-out')),
    ]),
  ]
})
export class UserDashboardComponent implements OnDestroy {

  public dashboardState: 'active' | 'inactive' | 'void' = 'void';

  constructor() { }

  toggleUserDashboard() {
    const dashElem: HTMLElement = document.getElementById('userD');
    // When element is created, it is void and is hidden. Make it visible to start
    dashElem.style.visibility = this.dashboardState === 'void' ? 'visible' : 'hidden';
    // Toggle between `active` and `void` states
    this.dashboardState = this.dashboardState === 'active' ? 'void' : 'active';
  }

  ngOnDestroy() {

  }

}
