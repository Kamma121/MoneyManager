import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Saving} from "../../../shared/Saving";
import {SavingService} from "../../../services/saving.service";
import {displayErrorSnackBar, displaySuccessSnackBar} from "../../../shared/functions";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-deposit-modal',
    templateUrl: './deposit-modal.component.html',
    styleUrls: ['./deposit-modal.component.css']
})
export class DepositModalComponent {

    @Input() saving: Saving = {
        id: null,
        name: null,
        currentAmount: null,
        targetAmount: null
    }
    @Output() refreshSavings = new EventEmitter;
    depositAmount: number | null = null;

    constructor(private savingService: SavingService, private snackBar: MatSnackBar) {
    }

    onSubmitDeposit() {
        const closeBtn = document.getElementById('deposit-close');
        if (this.saving.currentAmount) {
            this.saving.currentAmount += this.depositAmount || 0;
        }
        const updatedSaving: Saving = {
            id: this.saving.id,
            name: this.saving.name,
            currentAmount: this.saving.currentAmount,
            targetAmount: this.saving.targetAmount
        }
        this.savingService.updateSaving(updatedSaving).subscribe({
            next: () => {
                if (closeBtn) {
                    closeBtn.click();
                }
                this.refreshSavings.emit();
                displaySuccessSnackBar(this.snackBar, `Successfully deposited ${this.depositAmount}$`)
            },
            error: (error) => {
                if (this.saving.currentAmount) {
                    this.saving.currentAmount -= this.depositAmount || 0;
                }
                if (closeBtn) {
                    closeBtn.click();
                }
                displayErrorSnackBar(this.snackBar, 'Deposit failed.');
                console.error(error.error);
            }
        })
    }

}
