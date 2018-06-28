import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })
}

export interface User {
  id: number,
  alias: string,
  email: string,
  password: string,
  salt: string
}

export interface Auth {
  auth: { user: string };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

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
    return this.http.post<{ 'success': boolean, 'user': User }>('/api/passport/login',
      params.toString(),
      options
    ).pipe(map((res: { 'success': boolean, 'user': User }) => {
      return res.success
    }))
  }

  public isLoggedIn(): Observable<boolean> {
    return this.http.post<{ 'success': boolean, 'id'?: string }>('/api/passport/isloggedin/',
      null, httpOptions).pipe(map( (res:{ 'success': boolean, 'id'?: string }) => {
        console.log(`ApiService.isLoggedIn() ->`, res)
        return res.success
      }))
  }

  public userEmailExists(email: string) {
    return this.http.get('/api/user/email/' + email)
      .pipe(map((res: { id: number | null, email: string | null }) => {
        return res.email == null ? false : true;
      }));
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
}
