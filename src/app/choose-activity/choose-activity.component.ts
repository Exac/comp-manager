import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { CompetitionService } from '../competition.service';

@Component({
  selector: 'app-choose-activity',
  templateUrl: './choose-activity.component.html',
  styleUrls: ['./choose-activity.component.scss']
})
export class ChooseActivityComponent implements OnInit, OnDestroy {
  public breakpoint = 2;
  private user: { id: number, name: string, email: string } = { id: 0, name: 'Ms. Test', email: 'test@example.com' };

  constructor(private apiService: ApiService, private competition: CompetitionService) {
    this.user.id = 0;
    this.user.name = `Mr. Test`;
    this.user.email = `JohnnyTest@gmail.com`;
  }

  ngOnInit() {
    console.log('c-a init');
  }

  ngOnDestroy() {
    console.log('c-a destroy');
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth >= 475) ? 2 : 1;
  }

}
