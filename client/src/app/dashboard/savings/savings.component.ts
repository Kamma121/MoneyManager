import {Component, OnInit} from '@angular/core';
import {faDownload, faHammer, faMoneyBillTransfer, faPlus, faVault} from "@fortawesome/free-solid-svg-icons";
import {Saving} from "../../shared/Saving";
import {SavingService} from "../../services/saving.service";
import {
  displayErrorSnackBar,
  displayMonthYear,
  displayNoDataToExportSnackBar,
  displaySuccessSnackBar
} from "../../shared/functions";
import {MatSnackBar} from "@angular/material/snack-bar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {RighteousFontBase64} from "../../shared/righteousFontData";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css']
})
export class SavingsComponent implements OnInit {

  protected readonly downloadIcon: IconDefinition = faDownload;
  protected readonly plusIcon: IconDefinition = faPlus;
  protected readonly vaultIcon: IconDefinition = faVault;
  protected readonly depositIcon: IconDefinition = faMoneyBillTransfer;
  protected readonly hammerIcon: IconDefinition = faHammer;

  savings: Saving[] = [];
  selectedSaving: Saving = {
    id: null,
    name: null,
    currentAmount: null,
    targetAmount: null
  }

  constructor(private savingService: SavingService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.refreshSavings();
  }


  refreshSavings(): void {
    this.savingService.getAllSavings().subscribe({
      next: (res: Saving[]): void => {
        this.savings = res;

      },
      error: (error): void => {
        displayErrorSnackBar(this.snackBar, 'There was an unexpected error.');
        console.error(error.error);
      }

    })
  }

  progressBarValue(amount: number, target: number): number {
    return (amount / target) * 100;
  }

  onBreakBank(saving: Saving): void {
    this.savingService.deleteSaving(saving.id)?.subscribe({
      next: (): void => {
        displaySuccessSnackBar(this.snackBar, 'Piggy bank successfully destroyed.');
        this.refreshSavings();
      },
      error: (error): void => {
        console.error(error.error);
        displayErrorSnackBar(this.snackBar, 'Piggy bank deletion failed.')
      }
    })
  }

  exportToPdf(): void {
    if (this.savings.length === 0) {
      displayNoDataToExportSnackBar(this.snackBar);
      return;
    }
    const doc: jsPDF = new jsPDF();
    const currentDate: Date = new Date();
    const tableColumn: string[] = ["No.", "Savings goal", "Current amount", "Target amount", "Progress (%)"];
    const tableRows: (string | number | null)[][] = [];
    let number: number = 1;
    doc.setFontSize(18);
    doc.addFileToVFS("Righteous-Regular.ttf", RighteousFontBase64);
    doc.addFont("Righteous-Regular.ttf", "Righteous", "normal");
    doc.setFont('Righteous');
    doc.text('Money Manager', 10, 10);
    doc.setFontSize(12);
    doc.setFont('helvetica');
    doc.text(`${displayMonthYear(currentDate)} Savings Report`, 70, 35);
    this.savings.forEach(saving => {
      const progress: number = ((saving.currentAmount || 0) / (saving.targetAmount || 1)) * 100;
      const savingData = [
        number++,
        saving.name,
        `${saving.currentAmount}$`,
        `${saving.targetAmount}$`,
        `${progress.toFixed(2)}%`
      ];
      tableRows.push(savingData);
    });
    autoTable(doc, {head: [tableColumn], body: tableRows, startY: 40});
    const month = currentDate.getMonth() + 1;
    doc.save('Savings-' + month + '-' + currentDate.getFullYear() + '.pdf');
  }
}
