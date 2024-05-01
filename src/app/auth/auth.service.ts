import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface IAuthResponseData {
  kind: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  singUp(email: string, password: string): Observable<IAuthResponseData> {
    return this.http.post<IAuthResponseData>(environment.fireBaseAuthSignUp, {
      email,
      password,
      returnSecureToken: true
    })
  }
}
