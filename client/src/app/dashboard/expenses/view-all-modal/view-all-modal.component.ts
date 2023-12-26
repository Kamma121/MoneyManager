import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Expense} from "../../../shared/Expense";
import {faCheck, faPencil, faTimes} from "@fortawesome/free-solid-svg-icons";
import {ExpenseService} from "../../../services/expense.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  protected readonly deleteIcon = faTimes;
  protected readonly editIcon = faPencil;
  protected readonly successIcon = faCheck;
  editableRow: number = -1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategory']) {
      this.filterExpenses();
    }
  }

  toggleEdit(index:number):void{
    this.editableRow = index;
  }
  filterExpenses(): void {
    if (this.selectedCategory === 'All expenses') {
      this.filteredExpenses = Object.values(this.expensesByCategory).flat();
    } else {
      this.filteredExpenses = this.expensesByCategory[this.selectedCategory];
    }

  }

  removeExpense(index: number) {
    const expenseId = this.filteredExpenses[index].id;
    const closeBtn = document.getElementById("view-all-close");
    if (expenseId !== null) {
      this.expenseService.deleteExpense(expenseId)?.subscribe({
        next: () => {
          if (closeBtn) {
            closeBtn.click();
          }
          this.needRefresh.emit();
          this.snackBar.open('Successfully deleted expense.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.filteredExpenses.splice(index, 1);
        },
        error: err => {
          console.error('Error deleting expense:', err);
        }
      });
    }
  }

  updateExpense(expense: Expense) {
    const closeBtn = document.getElementById('view-all-close');
    this.expenseService.updateExpense(expense).subscribe({
        next: () => {
            if(closeBtn){
                closeBtn.click();
            }
            this.needRefresh.emit();
            this.editableRow = -1;
            this.snackBar.open('Successfully edited expense.', 'Close', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: ['success-snackbar']
            });
        },
        error: (error) => {
            console.log(error.error);
        }
    });
  }
}
