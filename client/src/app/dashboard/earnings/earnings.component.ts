import {Component, OnInit} from '@angular/core';
import {faCaretLeft, faCaretRight, faDownload, faPlus} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {EarningService} from "../../services/earning.service";
import {Earning} from "../../shared/Earning";
import {LegendPosition} from "@swimlane/ngx-charts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {sortByDate} from "../expenses/expenses.component";

@Component({
    selector: 'app-earnings',
    templateUrl: './earnings.component.html',
    styleUrls: ['./earnings.component.css']
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
        domain: ['#ffc8fd', '#cbc8ff', '#ffcec8', '#c8ffd4', '#a6fcfc', '#fff2cc']
    };
    below = LegendPosition.Below;
    selectedEarning: Earning = {
        id: null,
        date: null,
        source: '',
        amount: 0
    }

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
        sortByDate(this.earningsByDate);
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

    selectEarning(earning: Earning) {
        this.selectedEarning = earning;
        const openBtn = document.getElementById('earning-details-open');
        if (openBtn) {
            openBtn.click();
        }
    }

    exportToPdf(): void {
        const doc: jsPDF = new jsPDF();
        const tableColumn: string[] = ["No.", "Date", "Source", "Amount"];
        const tableRows: (string | number | null)[][] = [];
        let number: number = 1;
        doc.setFontSize(18);
        doc.setFont('helvetica');
        doc.text('Money Manager', 10, 10);
        doc.setFontSize(12);
        doc.text(`${this.displayMonthYear} Earnings Report`, 70, 35);
        this.earningsByDate.forEach(earning => {
            const earningData = [
                number++,
                earning.date ? new Date(earning.date).toLocaleDateString() : '',
                earning.source,
                `${earning.amount}$`
            ];
            tableRows.push(earningData);
        });
        autoTable(doc, {head: [tableColumn], body: tableRows, startY: 40});

        const rowHeight: number = 8;
        const tableHeight: number = rowHeight * this.earningsByDate.length;
        const finalY: number = 40 + tableHeight + 15;
        const pageWidth: number = 210;
        const text: string = `Total earned: ${this.totalEarnings}$`;
        const textSize: number = 12;
        const textWidth: number = text.length * (textSize / 4);
        doc.text(text, pageWidth - textWidth, finalY);
        const date = new Date(this.earningsByDate[0].date || 0);
        const month = date.getMonth() + 1;
        doc.save('Earnings-' + month + '-' + date.getFullYear() + '.pdf');
    }
}
