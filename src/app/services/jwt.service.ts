import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class JwtService {
  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    return this.httpClient.post<any>('http://localhost:8000/token/', { username, password }).pipe(tap(res => {
      localStorage.setItem('access_token', res.access);
    },
    error => console.log(error)))
  }

  // register(username: string, password: string) {
  //   return this.httpClient.post<{ access_token: string }>('http://localhost:8000/register/', { username, password }).pipe(tap(res => {
  //     this.login(username, password)
  //   }))
  // }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }
}