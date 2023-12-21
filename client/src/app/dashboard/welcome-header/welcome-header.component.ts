import {Component, Input} from '@angular/core';
import {User} from "../../shared/User";
import {
  faCircleUser,
  faCalendarCheck,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-welcome-header',
  templateUrl: './welcome-header.component.html',
  styleUrls: ['./welcome-header.component.css']
})
export class WelcomeHeaderComponent {
  @Input() user: User | null = null;
  currentDate = new Date();
  protected readonly userIcon = faCircleUser;
  protected readonly calendarIcon = faCalendarCheck;
  protected readonly signOutIcon = faRightFromBracket;
}
