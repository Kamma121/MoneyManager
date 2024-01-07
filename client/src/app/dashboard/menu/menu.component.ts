import {Component} from '@angular/core';
import {
  faBasketShopping,
  faChartLine,
  faCircleUser,
  faCoins,
  faPiggyBank,
  faRightFromBracket,
  faSackDollar
} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) {}


  protected readonly faSackDollar: IconDefinition = faSackDollar;
  protected readonly dashboardIcon: IconDefinition = faChartLine;
  protected readonly expenseIcon: IconDefinition = faBasketShopping;
  protected readonly earningsIcon: IconDefinition = faCoins;
  protected readonly savingsIcon: IconDefinition = faPiggyBank;
  protected readonly signOutIcon: IconDefinition = faRightFromBracket;
  protected readonly userIcon: IconDefinition = faCircleUser;

  onSignOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']).then();
  }
}
