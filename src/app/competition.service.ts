import { Injectable } from '@angular/core';
import Competition from './comp/Competition';
import { Observable } from '../../node_modules/rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '../../node_modules/@angular/common/http';
import { map } from '../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  public static competition: Competition;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(private http: HttpClient) {
    console.log('competition init');
  }

  /**
   * Save competition to database.
   */
  public create(): Observable<boolean> {
    console.log('service.create()', CompetitionService.competition);
    return this.http.post<boolean>('/api/competition/', { 'competition': CompetitionService.competition }, this.httpOptions)
      .pipe(map((res: boolean) => {
        console.log('response:', res);
        return res;
      }));
  }

}
