import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  public counter: number;

  constructor() {
    console.log('competition init');
    this.counter = 0;
  }

  public count(): number { return this.counter++; }


}
