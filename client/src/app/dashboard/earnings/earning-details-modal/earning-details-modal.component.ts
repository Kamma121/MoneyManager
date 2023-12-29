import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faCheck, faMagnifyingGlassDollar, faPencil, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Earning} from "../../../shared/Earning";
import {EarningService} from "../../../services/earning.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-earning-details-modal',
    templateUrl: './earning-details-modal.component.html',
    styleUrls: ['./earning-details-modal.component.css']
})
export class EarningDetailsModalComponent {
    @Input() earning: Earning = {
        id: null,
        date: null,
        source: '',
        amount: 0
    };
    @Output() needRefresh: EventEmitter<void> = new EventEmitter;

    constructor(private earningService: EarningService, private snackBar: MatSnackBar) {
    }


    protected readonly deleteIcon = faTimes;
    protected readonly successIcon = faCheck;
    protected readonly editIcon = faPencil;
    protected readonly dollarGlassIcon = faMagnifyingGlassDollar;
    editable: boolean = false;

    showSuccessMessage(message: string): void {
        this.snackBar.open(message, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
        });
    }

    updateEarning(earning: Earning) {
        const closeBtn = document.getElementById('earning-details-close');
        this.earningService.updateEarning(earning).subscribe({
            next: () => {
                if (closeBtn) {
                    closeBtn.click();
                }
                this.showSuccessMessage('Successfully updated an earning.');
                this.needRefresh.emit();
            },
            error: (error) => {
                console.log(error.error);
            }
        });
    }

    deleteEarning() {
        const closeBtn = document.getElementById('earning-details-close');
        this.earningService.deleteEarning(this.earning.id)?.subscribe({
            next: () => {
                if (closeBtn) {
                    closeBtn.click();
                }
                this.showSuccessMessage('Successfully deleted an earning.');
                this.needRefresh.emit();
            },
            error: (error) => {
                console.log(error.error);
            }
        });
    }
}
