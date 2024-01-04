import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
  faArrowRight,
  faBasketShopping,
  faCoins,
  faHeart,
  faPiggyBank,
} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../../services/user.service";
import {Summary} from "../../shared/Summary";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {
  }

  financialHealthScore: number = 0;
  quoteCategories: string[] = ['money', 'success', 'inspirational', 'failure'];

  protected readonly rightArrowIcon: IconDefinition = faArrowRight;
  protected readonly expenseIcon: IconDefinition = faBasketShopping;
  protected readonly earningsIcon: IconDefinition = faCoins;
  protected readonly savingsIcon: IconDefinition = faPiggyBank;
  protected readonly heartIcon: IconDefinition = faHeart;
  totalExpenses: number = 0;
  totalEarnings: number = 0;
  totalSavings: number = 0;
  quote: string = 'Preoccupation with money is the great test of small natures, but only a small test of great ones.';
  quoteAuthor: string = 'Nicolas Chamfort';

  ngOnInit(): void {
    this.getUserStatistics();
    // this.fetchQuote();
  }

  calculateFinancialHealthScore(): void {
    if (this.totalEarnings > 0) {
      const savingsRate: number = this.totalSavings / this.totalEarnings;
      const expenseRate: number = this.totalExpenses / this.totalEarnings;
      const savingsScore: number = savingsRate / 0.3;
      const expenseScore: number = (1 - expenseRate) / 0.5;
      let rawScore: number = (savingsScore + expenseScore) / 2;
      this.financialHealthScore = Math.min(Math.max(rawScore, 0), 1) * 100;
    } else {
      this.financialHealthScore = 0;
    }

  }


  getUserStatistics(): void {
    this.userService.getStatistics().subscribe({
      next: (response: Summary): void => {
        this.totalExpenses = response.totalExpenses;
        this.totalEarnings = response.totalEarnings;
        this.totalSavings = response.totalSavings;
        this.calculateFinancialHealthScore();
      }
    })
  }

  // fetchQuote(): void {
  //   const randomCategory: string = this.quoteCategories[Math.floor(Math.random() * this.quoteCategories.length)];
  //   fetch(`https://api.api-ninjas.com/v1/quotes?category=${randomCategory}`, {
  //     headers: {
  //       'X-Api-Key': 'mVBvFHZoOe71b0U7+DRQlQ==aAVCrCReCnhvlHCc'
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       this.quote = data[0].quote;
  //       this.quoteAuthor = data[0].author;
  //     })
  //     .catch(error => {
  //       console.error('Error fetching quote:', error);
  //     });
  // }

}
