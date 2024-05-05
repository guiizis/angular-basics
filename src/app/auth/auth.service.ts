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

interface userData {
  email: string,
  id: string,
  _token: string,
  _tokenExpirationDate: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null)

  private tokenExpirationTime: ReturnType<typeof setTimeout>

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

  autoLogin() {
    const userData: userData = JSON.parse(localStorage.getItem('userData'))

    if (!userData) {
      return
    }

    const {email, id, _token, _tokenExpirationDate} = userData

    const loadedUser = new User(email, id, _token, new Date(_tokenExpirationDate))

    if (loadedUser.token) {
      const expirationDuration = new Date(_tokenExpirationDate).getTime() - new Date().getTime()

      this.autoLogOut(expirationDuration)
      this.user.next(loadedUser)
    }
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.logout()
    }, expirationDuration)
  }

  logout() {
    this.user.next(null)
    this.router.navigate(['/auth'])

    localStorage.removeItem('userData')

    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime)
    }

    this.tokenExpirationTime = null
  }


  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate)

    this.user.next(user)
    this.autoLogOut(expiresIn * 1000)

    localStorage.setItem('userData', JSON.stringify(user))
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
