import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {Expense} from "../../../shared/Expense";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {ExpenseService} from "../../../services/expense.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DATE_LOCALE} from "@angular/material/core"
import {displayErrorSnackBar, displaySuccessSnackBar} from "../../../shared/functions";

@Component({
  selector: 'app-add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
  styleUrls: ['./add-expense-modal.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-US'},
  ],
  encapsulation: ViewEncapsulation.None
})
export class AddExpenseModalComponent {

  constructor(private expenseService: ExpenseService, private snackBar: MatSnackBar) {
  }


  categories: string[] = ['House & Bills', 'Food & Groceries', 'Transport', 'Entertainment & Education', 'Clothing & Personal care', 'Other'];
  userExpenses: Expense[] = [this.createEmptyExpense()];
  protected readonly deleteIcon = faTimes;
  @Output() expenseAdded = new EventEmitter<void>();


  createEmptyExpense(): Expense {
    return {
      id: null,
      date: null,
      message: '',
      category: '',
      amount: null
    };
  }

  addExpense(): void {
    this.userExpenses.push(this.createEmptyExpense());
  }

  removeExpense(index: number): void {
    this.userExpenses.splice(index, 1);
  }


  onSubmitExpenses() {
    this.expenseService.addExpenses(this.userExpenses).subscribe({
      next: () => {
        const closeBtn = document.getElementById('add-expense-close');
        if (closeBtn) {
          closeBtn.click();
        }
        if (this.userExpenses.length > 1) {
          displaySuccessSnackBar(this.snackBar, `Successfully added ${this.userExpenses.length} expenses`);
        } else {
          displaySuccessSnackBar(this.snackBar, `Successfully added 1 expense`);
        }
        this.userExpenses = [];
        this.addExpense();
        this.expenseAdded.emit();
      },
      error: (error) => {
        displayErrorSnackBar(this.snackBar, 'Expense submission failed.');
        console.log(error.error);
      }
    });
  }
}
