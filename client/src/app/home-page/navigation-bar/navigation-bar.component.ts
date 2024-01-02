import { Component } from '@angular/core';
import {faSackDollar} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  faSackDollar = faSackDollar;
  constructor(private router:Router) {}
  navigate(fragment: string):void {
    this.router.navigate(['/'], { fragment: fragment });
  }
}
