import {Component} from '@angular/core';
import {AuthenticationService} from "../../authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.css']
})
export class SignInModalComponent{
  email: string = "";
  password: string = "";
  loginError: string = "";
  invalidEmail: boolean = false;
  invalidPassword: boolean = false;


  constructor(private authService: AuthenticationService, private router: Router) {
  }

  onSubmitSignIn() {
    this.invalidEmail = false;
    this.invalidPassword = false;
    this.authService.signIn(this.email, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        const closeBtn = document.getElementById('sign-in-close');
        if(closeBtn){
          closeBtn.click();
        }
        this.router.navigate(['/dashboard']);

      },
      error: (error) => {
        this.loginError = error.error;
        if (this.loginError.includes('not found')) {
          this.invalidPassword = true;
          this.invalidEmail = true;
        } else if (this.loginError.includes('password')) {
          this.invalidPassword = true;
          this.password = "";
        }
      }
    })
  }
}
