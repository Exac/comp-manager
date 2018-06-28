import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ApiService } from './api.service';

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

@Injectable({
  providedIn: 'root'
})
export class PassportGuard implements CanActivate {

  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {
    return this.http.post<{ 'success': boolean, 'id'?: string }>('/api/passport/isloggedin/',
      null, httpOptions).pipe(map( (res:{ 'success': boolean, 'id'?: string }) => {
        console.log(`ApiService.isLoggedIn() ->`, res)
        if (res.success) {
          return true
        } else {
          console.log('Not Logged in, navigating to /login page now.')
          state.url = '/login'
          this.router.navigate(['/login'])
          return false; 
        }
      }))
  }
  
}
