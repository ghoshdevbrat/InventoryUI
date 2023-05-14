import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../_models/login';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  baseUrl = environment.baseUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  private http: HttpClient;

  constructor(private httpBackend: HttpBackend) { }

  login(model: any) {
    this.http = new HttpClient(this.httpBackend);
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        console.log(response)
        const user = response;
        if(user) {
          sessionStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout() {
    sessionStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  // setCurrentUser(user: User) {
  //   user.role = [];
  //   console.log(`User in setCurrentUserMethod: ${user}`);
  //   const roles = this.getDecodedToken(user.token).role;
  //   Array.isArray(roles) ? user.role = roles : user.role.push(roles);
  //   localStorage.setItem('user', JSON.stringify(user));
  //   this.currentSource.next(user);
  // }

  getDecodedToken(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  } 
}
