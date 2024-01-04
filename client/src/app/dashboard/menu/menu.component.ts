import {Component} from '@angular/core';
import {
  faBasketShopping, faChartLine, faCircleUser,
  faCoins,
  faPiggyBank,
  faRightFromBracket,
  faSackDollar
} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) {
  }


  protected readonly faSackDollar = faSackDollar;
  protected readonly dashboardIcon = faChartLine;
  protected readonly expenseIcon = faBasketShopping;
  protected readonly earningsIcon = faCoins;
  protected readonly savingsIcon = faPiggyBank;
  protected readonly signOutIcon = faRightFromBracket;
  protected readonly userIcon = faCircleUser;
  isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onSignOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }
}
