import {Component, OnInit} from '@angular/core';
import {faCheck, faCircleUser, faPencil, faTimes} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../../services/user.service";
import {User} from "../../shared/User";
import {displayErrorSnackBar, displaySuccessSnackBar} from "../../shared/functions";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router) {
  }

  protected readonly profileIcon: IconDefinition = faCircleUser;
  protected readonly editIcon: IconDefinition = faPencil;
  protected readonly successIcon: IconDefinition = faCheck;
  protected readonly deleteIcon: IconDefinition = faTimes;
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  }
  isEditable: boolean = false;

  toggleEdit(): void {
    this.isEditable = !this.isEditable;
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.userService.getUser().subscribe({
      next: (res: User): void => {
        this.user = res;
      },
      error: (error): void => {
        displayErrorSnackBar(this.snackBar, 'There was an unexpected error.');
        console.error(error);
      }
    })
  }

  onUserUpdate(): void {
    this.isEditable = false;
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        displaySuccessSnackBar(this.snackBar, 'Successfully updated profile. Please sign-in again');
        setTimeout((): void => {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }, 3000);
      },
      error: (err): void => {
        console.error(err.error);
        displayErrorSnackBar(this.snackBar, 'Profile update failed.');
      }
    })
  }

}
