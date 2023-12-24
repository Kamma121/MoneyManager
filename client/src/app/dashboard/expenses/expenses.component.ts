import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {faCaretLeft, faCaretRight, faDownload, faPlus} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {Expense} from "../../shared/Expense";
import {ExpenseService} from "../../services/expense.service";
import {LegendPosition} from "@swimlane/ngx-charts";


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExpensesComponent implements OnInit {
  expenses: Expense[] = [];
  expensesByCategory: { [category: string]: Expense[] } = {};
  currentDate: Date = new Date();
  protected readonly leftIcon: IconDefinition = faCaretLeft;
  protected readonly rightIcon: IconDefinition = faCaretRight;
  protected readonly downloadIcon: IconDefinition = faDownload;
  protected readonly plusIcon: IconDefinition = faPlus;
  categories: string[] = ['House & Bills', 'Food & Groceries', 'Transport', 'Entertainment & Education', 'Clothing & Personal care', 'Other'];
  data:any[] = [];
  totalExpenses:number = 0;
  colorScheme: any = {
    domain: ['#ffcec8', '#c8ffd4', '#a6fcfc', '#cbc8ff', '#ffc8fd', '#fff2cc']
  };
  below = LegendPosition.Below;

  constructor(private expenseService: ExpenseService) {
  }

  ngOnInit(): void {
    this.expenseService.getAllExpenses().subscribe(
      data => {
        this.expenses = data;
        this.categorizeExpenses();
        this.categorizeAndSumExpenses();
      },
      error => {
        console.log(error.error);
      }
    );
  }

  private categorizeAndSumExpenses(): void {
    this.totalExpenses = 0;
    this.data = this.categories.map(category => {
      const totalForCategory = this.expensesByCategory[category]
        .reduce((sum, expense) => sum + expense.amount, 0);

      this.totalExpenses += totalForCategory;

      return {
        name: category,
        value: totalForCategory
      };
    });
  }

  private categorizeExpenses(): void {
    this.categories.forEach(category => {
      this.expensesByCategory[category] = this.expenses.filter(expense => {
        return expense.category === category && this.isSameMonthAndYear(expense.date, this.currentDate);
      });
    });
  }

  private isSameMonthAndYear(date1: string | Date, date2: Date): boolean {
    const d1 = new Date(date1);
    return d1.getMonth() === date2.getMonth() && d1.getFullYear() === date2.getFullYear();
  }


  get displayMonthYear(): string {
    const month: string = this.currentDate.toLocaleString('en-US', {month: 'long'});
    const year: number = this.currentDate.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)}, ${year}`;
  }

  changeMonth(amount: number): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + amount, 1);
    this.categorizeExpenses();
    this.categorizeAndSumExpenses();
  }
}
