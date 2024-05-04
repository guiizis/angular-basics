import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface IAuthResponseData {
  kind: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  idToken: string,
  localId: string,
  registered?: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null)

  constructor(private http: HttpClient, private router: Router) { }

  singUp(email: string, password: string): Observable<IAuthResponseData> {
    return this.http.post<IAuthResponseData>(environment.fireBaseAuthSignUp, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(errorResponse => {
        return this.handleError(errorResponse)
      }),
      tap(data => {
        this.handleAuth(data.email, data.localId, data.idToken, +data.expiresIn)
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
      }),
      tap(data => {
        this.handleAuth(data.email, data.localId, data.idToken, +data.expiresIn)
      })
    )
  }

  logout() {
    this.user.next(null)
    this.router.navigate(['/auth'])
  }


  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate)

    this.user.next(user)
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
