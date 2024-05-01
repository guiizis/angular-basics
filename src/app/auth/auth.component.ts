import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true
  isLoading = false
  error: string = null

  constructor(private authService: AuthService) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.value) {
      return
    }

    const { email, password } = form.value

    this.isLoading = true

    if (this.isLoginMode) {

    } else {
      this.authService.singUp(email, password).subscribe(data => {
        console.log(data)
        this.isLoading = false
      },
        (errorMessage => {
          this.error = errorMessage
          this.isLoading = false
        })
      )
    }
    form.reset()
  }
}
