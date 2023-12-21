import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../shared/User";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:User | null = null;

  constructor(private userService:UserService) {
  }
  ngOnInit(): void {
     this.userService.getUser().subscribe(data =>{
       this.user = data;
     });
  }
}
