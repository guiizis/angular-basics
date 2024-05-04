import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, IAuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true
  isLoading = false
  error: string = null

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.value) {
      return
    }

    const { email, password } = form.value

    let authObs: Observable<IAuthResponseData>

    this.isLoading = true

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.singUp(email, password)
    }

    authObs.subscribe(data => {
      console.log(data)
      this.router.navigate(['/recipes'])
      this.isLoading = false
    },
      (errorMessage => {
        this.error = errorMessage
        this.isLoading = false
      })
    )

    form.reset()

  }
}
