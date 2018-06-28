import { Component, OnInit } from '@angular/core';
import { ApiService, Auth, User } from '../api.service';
import { throwError } from 'rxjs';
import { LoginRegistrationService } from '../login-registration.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  private email: string;
  private password: string;

  constructor(private apiService: ApiService) {
    
  }

  ngOnInit() {

  }

  submit() {
    this.apiService.login(this.email, this.password).subscribe(
      (res:boolean/*{'success':boolean, 'user'?:User}*/) => {
        if (res/*.success*/) {
          console.log('TODO: Redirect to /choose-activity' )
        } else {
          console.log('TODO: FAILED')
        }
      }, (err) => {
        console.log('whoops:',err)
      }
    )
  }

}
