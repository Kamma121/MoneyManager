import { Component } from '@angular/core';
import {faSackDollar} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  faSackDollar = faSackDollar;
}
