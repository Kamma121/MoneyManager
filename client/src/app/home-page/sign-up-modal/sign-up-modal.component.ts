import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css', '../sign-in-modal/sign-in-modal.component.css']
})
export class SignUpModalComponent {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  userExist:boolean = false;


  constructor(private authService: AuthenticationService, private router: Router) {
  }

  onSubmitSignUp() {
      this.userExist = false;
    this.authService.signUp(this.firstName, this.lastName, this.email, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        const closeBtn = document.getElementById('sign-up-close');
        if (closeBtn) {
          closeBtn.click();
        }
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.userExist = true;
      }
    })
  }

  isValidPassword(password: string): boolean {
    return password.length > 4;
  }

  isValidEmail(email: string): boolean {
    const regex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
    return regex.test(email);
  }
}
