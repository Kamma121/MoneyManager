import {Component, OnInit} from '@angular/core';
import {faCaretLeft, faCaretRight, faDownload, faPlus} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent{

  currentDate: Date = new Date();
  protected readonly leftIcon: IconDefinition = faCaretLeft;
  protected readonly rightIcon: IconDefinition = faCaretRight;
  protected readonly downloadIcon: IconDefinition = faDownload;
  protected readonly plusIcon: IconDefinition = faPlus;
  categories:string[] = ['House & Bills','Food & Groceries', 'Transport', 'Entertainment & Education', 'Clothing & Personal care', 'Other'];


  get displayMonthYear(): string {
    const month: string = this.currentDate.toLocaleString('en-US', {month: 'long'});
    const year: number = this.currentDate.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)}, ${year}`;
  }

  changeMonth(amount: number): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + amount, 1);
  }
}
