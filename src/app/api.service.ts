import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserDashboardComponent } from './user-info/user-dashboard/user-dashboard.component';
import { IUser } from './IUser';
import { User } from './User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })
}

export interface Auth {
  auth: { user: string };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public static user: User;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  }

  constructor(private http: HttpClient) {
    if (typeof ApiService.user === 'undefined') {
      ApiService.user = new User(0, 'Alias', 'email@example.com')
    }
  }

  public login(email: string, password: string): Observable<boolean/*{ 'success': boolean, 'user'?: User }*/> {
    let params: HttpParams = new HttpParams()
    params = params.set('email', email)
    params = params.append('username', email)
    params = params.append('password', password)
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    }
    return this.http.post<{ 'success': boolean, 'user': IUser }>('/api/passport/login',
      params.toString(),
      options
    ).pipe(map((res: { 'success': boolean, 'user': IUser }) => {
      return res.success
    }))
  }

  public logout(): Observable<boolean> {
    return this.http.post<{ 'success': boolean }>('/api/passport/logout',
      null, httpOptions).pipe(map((res: { 'success': boolean }) => {
        // TODO: Uncomment this, it is essential
        ApiService.user = new User();
        return res.success;
      }))
  }

  public isLoggedIn(): Observable<boolean> {
    return this.http.post<{ 'success': boolean, 'id'?: string }>('/api/passport/isloggedin/',
      null, httpOptions).pipe(map((res: { 'success': boolean, 'user'?: IUser }) => {
        if (typeof res.user !== 'undefined') {
          ApiService.user = new User(res.user.id, res.user.alias, res.user.email)
        } else {
          ApiService.user = new User()
        }

        return res.success
      }))
  }

  public getUserEmail(id: number): Observable<string> {
    return this.http.get(`/api/user/email/${id}`)
      .pipe(map((res: { email: string }) => {
        return res.email;
      }));
  }

  public getUserAlias(userid: number): Observable<string> {
    return this.http.get('/api/user/alias/' + userid)
      .pipe(map((res: { alias: string }) => {
        return res.alias;
      }));
  }

  public setUserAlias(alias: string): Observable<string> {
    return this.http.post<string>(
      '/api/user/name',
      alias,
      httpOptions
    );
  }

  public updateUserPassword(password: string, userid: number, recovery?: string): Observable<{ success: boolean }> {
    if (typeof recovery !== 'undefined') {
      // recovering password from account recovery page with their unhased recovery key
      return this.http.put<{ success: boolean }>(
        '/api/user/password/',
        { 'password': password, 'userid': userid, 'recovery': recovery },
        httpOptions
      ).pipe(map((res: { success: boolean }) => {
        return res;
      }));
    } else {
      // user is logged in, and changing their password
      return this.http.put<{ success: boolean }>(
        '/api/user/password/',
        { 'password': password, 'userid': userid },
        httpOptions
      ).pipe(map((res: { success: boolean }) => {
        return res;
      }));
    }
  }

  public sendRecoveryEmail(email: string): Observable<{ success: boolean, message: string }> {
    const req = { 'email': email };
    return this.http.post<{ success: boolean, message: string }>(
      '/api/user/forgot',
      req,
      httpOptions
    );
  }

  public createUser(userEmail: string, userAlias: string, userPassword: string): Observable<{ success: boolean, message: string }> {
    let usr = { email: userEmail, alias: userAlias, password: userPassword };
    return this.http.post('/api/user/', usr, this.httpOptions)
      .pipe(map((res: { success: boolean, message: string }) => {
        console.log('createUser:::', res)
        return res;
      }));
  }

  public userEmailExists(email: string): Observable<boolean> {
    return this.http.get(`/api/user/email/${email}/exists`)
      .pipe(map((res: boolean) => {
        console.log(res ? ':::exists' : ':::does not exist')
        return res;
      }));
  }

  public userAliasExists(alias: string): Observable<boolean> {
    return this.http.get(`/api/user/alias/${alias}/exists`)
      .pipe(map((res: boolean) => {
        console.log(res ? ':::exists' : ':::does not exist')
        return res;
      }));
  }


}
