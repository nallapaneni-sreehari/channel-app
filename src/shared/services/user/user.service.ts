import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public URL = 'http://localhost:2000/v1/user/data/'

  constructor(private http: HttpClient) { }


  register(user:any): Observable<any>
  {
    return this.http.post(this.URL+"register", {...user});
  }

  login(user:any): Observable<any>
  {
    return this.http.post(this.URL+"login", user);
  }

}
