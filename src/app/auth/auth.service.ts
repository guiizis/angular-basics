import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
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
    }).pipe(
      catchError(errorResponse => {
        let errorMessage = 'an unknown error occurred!'

        if(!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMessage)
        }

        switch(errorResponse.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = `This email already exists`
        }

        return throwError(errorMessage)
      })
    )
  }
}
