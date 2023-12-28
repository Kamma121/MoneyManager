import {Component, OnInit} from '@angular/core';
import {faCaretLeft, faCaretRight, faDownload, faPlus} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {EarningService} from "../../services/earning.service";
import {Earning} from "../../shared/Earning";
import {LegendPosition} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.css', '../expenses/expenses.component.css']
})
export class EarningsComponent implements OnInit {

  constructor(private earningService: EarningService) {
  }

  protected readonly leftIcon: IconDefinition = faCaretLeft;
  protected readonly rightIcon: IconDefinition = faCaretRight;
  protected readonly downloadIcon: IconDefinition = faDownload;
  protected readonly plusIcon: IconDefinition = faPlus;
  currentDate: Date = new Date();
  totalEarnings: number = 0;
  earnings: Earning[] = [];
  earningsByDate: Earning[] = [];
  earningsData: any[] = [];
  colorScheme: any = {
    domain: ['#ffc8fd','#cbc8ff','#ffcec8', '#c8ffd4', '#a6fcfc','#fff2cc']
  };
  below = LegendPosition.Below;
  ngOnInit(): void {
    this.refreshEarnings();
  }


  get displayMonthYear(): string {
    const month: string = this.currentDate.toLocaleString('en-US', {month: 'long'});
    const year: number = this.currentDate.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)}, ${year}`;
  }

  changeMonth(amount: number): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + amount, 1);
    this.groupEarningsByDate();
    this.processEarningsData();
  }

  refreshEarnings() {
    this.earningService.getAllEarnings().subscribe({
      next: (response: any) => {
        this.earnings = response;
        this.groupEarningsByDate();
        this.processEarningsData();
      },
      error: (error: any) => {
        console.log(error.error);
      }
    });
  }

  groupEarningsByDate(): void {
    this.earningsByDate = this.earnings.filter(earning => {
      return this.isSameMonthAndYear(earning.date, this.currentDate);
    })
  }

  private isSameMonthAndYear(date1: string | Date | null, date2: Date): boolean {
    if (date1 === null) {
      return false;
    }
    const d1 = new Date(date1);
    return d1.getMonth() === date2.getMonth() && d1.getFullYear() === date2.getFullYear();
  }

  processEarningsData() {
    const earningsBySource = new Map<string, number>();
    this.totalEarnings = 0;
    this.earningsByDate.forEach(earning => {
      this.totalEarnings += earning.amount || 0;
      earningsBySource.set(earning.source || '',
        (earningsBySource.get(earning.source || '') || 0) + (earning.amount || 0));
    });

    this.earningsData = Array.from(earningsBySource).map(([source, amount]) => ({
      name: source,
      value: amount
    }));
  }
}
