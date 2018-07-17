import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { User } from '../../User';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {

  }

  logout() {
    const usersEmail: string = ApiService.user.email;
    this.apiService.logout().subscribe(
      (success: boolean) => { // navigate back to login page now
          if (success) this.router.navigate(['/login', { 'email': usersEmail }]);
      }
    )
  }

  getUserAlias(): string {
    return ApiService.user.alias;
  }

}
