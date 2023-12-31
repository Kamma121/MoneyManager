import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Expense} from "../../../shared/Expense";
import {faCheck, faPencil, faTimes} from "@fortawesome/free-solid-svg-icons";
import {ExpenseService} from "../../../services/expense.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {displayErrorSnackBar, displaySuccessSnackBar} from "../../../shared/functions";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-view-all-modal',
  templateUrl: './view-all-modal.component.html',
  styleUrls: ['./view-all-modal.component.css']
})
export class ViewAllModalComponent implements OnChanges {
  constructor(private expenseService: ExpenseService, private snackBar: MatSnackBar) {
  }

  @Input() expensesByCategory: { [category: string]: Expense[] } = {};
  @Input() selectedCategory: string = '';
  @Output() needRefresh: EventEmitter<void> = new EventEmitter;
  categories: string[] = ['House & Bills', 'Food & Groceries', 'Transport', 'Entertainment & Education', 'Clothing & Personal care', 'Other'];
  filteredExpenses: Expense[] = [];
  protected readonly deleteIcon: IconDefinition = faTimes;
  protected readonly editIcon: IconDefinition = faPencil;
  protected readonly successIcon: IconDefinition = faCheck;
  editableRow: number = -1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategory']) {
      this.filterExpenses();
    }
  }

  toggleEdit(index: number): void {
    this.editableRow = index;
  }

  filterExpenses(): void {
    if (this.selectedCategory === 'All expenses') {
      this.filteredExpenses = Object.values(this.expensesByCategory).flat();
    } else {
      this.filteredExpenses = this.expensesByCategory[this.selectedCategory];
    }

  }

  removeExpense(index: number): void {
    const expenseId: number | null = this.filteredExpenses[index].id;
    const closeBtn: HTMLElement | null = document.getElementById("view-all-close");
    if (expenseId !== null) {
      this.expenseService.deleteExpense(expenseId)?.subscribe({
        next: (): void => {
          if (closeBtn) {
            closeBtn.click();
          }
          this.needRefresh.emit();
          displaySuccessSnackBar(this.snackBar, 'Successfully deleted expense.');
          this.filteredExpenses.splice(index, 1);
        },
        error: err => {
          if (closeBtn) {
            closeBtn.click();
          }
          displayErrorSnackBar(this.snackBar, 'Expense deletion failed.');
          console.error(err.error);
        }
      });
    }
  }

  updateExpense(expense: Expense): void {
    const closeBtn: HTMLElement | null = document.getElementById('view-all-close');
    this.expenseService.updateExpense(expense).subscribe({
      next: (): void => {
        if (closeBtn) {
          closeBtn.click();
        }
        this.needRefresh.emit();
        this.editableRow = -1;
        displaySuccessSnackBar(this.snackBar, 'Successfully edited expense.');
      },
      error: (error): void => {
        if (closeBtn) {
          closeBtn.click();
        }
        displayErrorSnackBar(this.snackBar, 'Expense update failed.');
        console.log(error.error);
      }
    });
  }
}
