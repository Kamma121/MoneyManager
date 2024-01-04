import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/User";
import {
  faCircleUser,
  faCalendarCheck,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";


@Component({
  selector: 'app-welcome-header',
  templateUrl: './welcome-header.component.html',
  styleUrls: ['./welcome-header.component.css']
})
export class WelcomeHeaderComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
  }

  user: User | null = null;

  ngOnInit(): void {
    this.userService.getUser().subscribe(data => {
      this.user = data;
    });
  }

  currentDate: Date = new Date();
  protected readonly userIcon: IconDefinition = faCircleUser;
  protected readonly calendarIcon: IconDefinition = faCalendarCheck;
  protected readonly signOutIcon: IconDefinition = faRightFromBracket;

  onSignOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }
}
