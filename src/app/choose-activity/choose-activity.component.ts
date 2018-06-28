import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-choose-activity',
  templateUrl: './choose-activity.component.html',
  styleUrls: ['./choose-activity.component.scss']
})
export class ChooseActivityComponent implements OnInit {

  private user: { id: number, name: string, email: string } = { id: 0, name: 'Ms. Test', email: 'test@example.com' };

  constructor(private apiService: ApiService) {
    this.user.id = 0;
    this.user.name = `Mr. Test`;
    this.user.email = `JohnnyTest@gmail.com`;
  }

  ngOnInit() {

  }

}
