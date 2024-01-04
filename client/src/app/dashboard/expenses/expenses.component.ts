import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {faCaretLeft, faCaretRight, faDownload, faPlus} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {Expense} from "../../shared/Expense";
import {ExpenseService} from "../../services/expense.service";
import {LegendPosition} from "@swimlane/ngx-charts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  displayErrorSnackBar,
  displayMonthYear,
  displayNoDataToExportSnackBar,
  isSameMonthAndYear,
  sortByDate
} from "../../shared/functions";
import {RighteousFontBase64} from "../../shared/righteousFontData";


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
  protected readonly displayMonthYear = displayMonthYear;
  chartView: [number, number] = [400, 300];
  constructor(private expenseService: ExpenseService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.refreshExpenses();
    this.adjustChartView(window.innerWidth);
  }
  private adjustChartView(width: number):void {
    if (width<1040){
      this.chartView = [200, 200];
    }
    else if (width < 1200) {
      this.chartView = [300, 300];
    }
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
        return expense.category === category && isSameMonthAndYear(expense.date, this.currentDate);
      });
    });
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
        displayErrorSnackBar(this.snackBar, 'There was an unexpected error.');
        console.error(error.error);
      }
    });
  }

  exportToPdf() {
    const currentMonthExpenses: Expense[] = Object.values(this.expensesByCategory).flat();
    if (currentMonthExpenses.length === 0) {
      displayNoDataToExportSnackBar(this.snackBar);
      return;
    }
    const doc: jsPDF = new jsPDF();
    const tableColumn: string[] = ["No.", "Date", "Message", "Category", "Amount"];
    const tableRows: (string | number | null)[][] = [];
    let number: number = 1;
    doc.setFontSize(18);
    doc.addFileToVFS("Righteous-Regular.ttf", RighteousFontBase64);
    doc.addFont("Righteous-Regular.ttf", "Righteous", "normal");
    doc.setFont('Righteous');
    doc.text('Money Manager', 10, 10);
    doc.setFontSize(12);
    doc.setFont('helvetica');
    doc.text(`${displayMonthYear(this.currentDate)} Expenses Report`, 70, 35);

    sortByDate(currentMonthExpenses);
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
    const date = new Date(currentMonthExpenses[0].date || 0);
    const month = date.getMonth() + 1;
    doc.save('Expenses-' + month + '-' + date.getFullYear() + '.pdf');
  }

  openViewAllModal(category: string): void {
    this.viewAllModalOpen.emit(this.expensesByCategory);
    this.selectedCategory = category;
  }
}
