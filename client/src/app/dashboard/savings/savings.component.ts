import {Component, OnInit} from '@angular/core';
import {faDownload, faHammer, faMoneyBillTransfer, faPlus, faVault} from "@fortawesome/free-solid-svg-icons";
import {Saving} from "../../shared/Saving";
import {SavingService} from "../../services/saving.service";
import {displayErrorSnackBar} from "../../shared/functions";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css']
})
export class SavingsComponent implements OnInit {

  protected readonly downloadIcon = faDownload;
  protected readonly plusIcon = faPlus;
  protected readonly vaultIcon = faVault;
  protected readonly depositIcon = faMoneyBillTransfer;
  protected readonly hammerIcon = faHammer;

  savings: Saving[] = [];

  constructor(private savingService: SavingService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.refreshSavings();
  }


  refreshSavings() {
    this.savingService.getAllSavings().subscribe({
      next: (res) => {
        this.savings = res;

      },
      error: (error) => {
        displayErrorSnackBar(this.snackBar, 'There was an unexpected error.');
        console.error(error.error);
      }

    })
  }
   progressBarValue(amount:number,target:number) {
    return (amount / target) * 100;
  }
}
