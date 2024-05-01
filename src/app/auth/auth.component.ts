import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true

  constructor(private authService: AuthService) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if (!form.value) {
      return
    }

    const { email, password } = form.value

    if (this.isLoginMode) {

    } else {
      this.authService.singUp(email, password).subscribe(data => {
        console.log(data)
      },
        (error => {
          console.log('something wrong was happen ' + error.message)
        })
      )
    }
    form.reset()
  }
}
