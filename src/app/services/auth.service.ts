import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  userAuthentication(data){
    
    return this.http.post(environment.APIURL + 'user/adminlogin', data);
  }
}
