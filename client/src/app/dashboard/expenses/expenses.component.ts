import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {faCaretLeft, faCaretRight, faDownload, faPlus} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {Expense} from "../../shared/Expense";
import {ExpenseService} from "../../services/expense.service";
import {LegendPosition} from "@swimlane/ngx-charts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


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
  data: any[] = [];
  totalExpenses: number = 0;
  colorScheme: any = {
    domain: ['#ffcec8', '#c8ffd4', '#a6fcfc', '#cbc8ff', '#ffc8fd', '#fff2cc']
  };
  below = LegendPosition.Below;
  @Output() viewAllModalOpen = new EventEmitter<{ [category: string]: Expense[] }>();
  selectedCategory: string = '';

  constructor(private expenseService: ExpenseService) {
  }

  ngOnInit(): void {
    this.refreshExpenses();
  }

  private categorizeAndSumExpenses(): void {
    this.totalExpenses = 0;
    this.data = this.categories.map(category => {
      const totalForCategory = this.expensesByCategory[category]
        .reduce((sum, expense) => sum + (expense.amount || 0), 0);

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

  private isSameMonthAndYear(date1: string | Date | null, date2: Date): boolean {
    if (date1 === null) {
      return false;
    }
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

  refreshExpenses() {
    this.expenseService.getAllExpenses().subscribe({
      next: (response: any) => {
        this.expenses = response;
        this.categorizeExpenses();
        this.categorizeAndSumExpenses();
      },
      error: (error: any) => {
        console.log(error.error);
      }
    });
  }

  exportToPdf() {
    const doc: jsPDF = new jsPDF();
    const tableColumn: string[] = ["No.", "Date", "Message", "Category", "Amount"];
    const tableRows: (string | number | null)[][] = [];
    let number: number = 1;
    doc.setFontSize(18);
    doc.setFont('helvetica');
    doc.text('Money Manager', 10, 10);
    doc.setFontSize(12);
    doc.text(`${this.displayMonthYear} Expenses Report`, 70, 35);
    const currentMonthExpenses: Expense[] = Object.values(this.expensesByCategory).flat();
    currentMonthExpenses.sort((a, b) => {
      if (a.date === null) return 1;
      if (b.date === null) return -1;
      const dateA = a.date instanceof Date ? a.date : new Date(a.date);
      const dateB = b.date instanceof Date ? b.date : new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
    currentMonthExpenses.forEach(expense => {
      const expenseData = [
        number++,
        expense.date ? new Date(expense.date).toLocaleDateString() : '',
        expense.message,
        expense.category,
        `${expense.amount}$`
      ];
      tableRows.push(expenseData);
    });
    autoTable(doc, {head: [tableColumn], body: tableRows, startY: 40});

    const rowHeight: number = 8;
    const tableHeight: number = rowHeight * currentMonthExpenses.length;
    const finalY: number = 40 + tableHeight + 15;
    const pageWidth: number = 210;
    const text: string = `Total spent: ${this.totalExpenses}$`;
    const textSize: number = 12;
    const textWidth: number = text.length * (textSize / 4);
    doc.text(text, pageWidth - textWidth, finalY);
    doc.save('expenses.pdf');
  }

  openViewAllModal(category: string): void {
    this.viewAllModalOpen.emit(this.expensesByCategory);
    this.selectedCategory = category;
  }

}
