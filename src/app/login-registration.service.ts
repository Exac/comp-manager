import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginRegistrationService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  }

  constructor(private http: HttpClient) { }

  public createUser(userEmail: string, userAlias: string, userPassword: string): Observable<{ success: boolean, message: string }> {
    let usr = { email: userEmail, alias: userAlias, password: userPassword };
    return this.http.post('/api/user/', usr, this.httpOptions)
      .pipe(map((res: { success: boolean, message: string }) => {
        console.log('createUser:::',res)
        return res;
      }));
  }

  public userEmailExists(email: string): Observable<{ success: boolean, message: string }> {
    return this.http.get('/api/user/email/' + email)
      .pipe(map((res: { success: boolean, message: string }) => {
        console.log('userEmailExists:::',res)
        return res;
      }));
  }

}
