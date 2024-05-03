import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IAuthResponseData {
  kind: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean,
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
        return this.handleError(errorResponse)
      })
    )
  }

  login(email: string, password: string) {
    return this.http.post<IAuthResponseData>(environment.fireBaseAuthSignIn, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(errorResponse => {
        return this.handleError(errorResponse)
      })
    )
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'an unknown error occurred!'

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage)
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = `This email already exists`
      case 'EMAIL_NOT_FOUND':
        errorMessage = `This email was not found, try another`
      case 'INVALID_PASSWORD':
        errorMessage = `Password incorrect`
    }

    return throwError(errorMessage)
  }
}
