import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faCheck, faMagnifyingGlassDollar, faPencil, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Earning} from "../../../shared/Earning";
import {EarningService} from "../../../services/earning.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {displayErrorSnackBar, displaySuccessSnackBar} from "../../../shared/functions";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

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

  protected readonly deleteIcon: IconDefinition = faTimes;
  protected readonly successIcon: IconDefinition = faCheck;
  protected readonly editIcon: IconDefinition = faPencil;
  protected readonly dollarGlassIcon: IconDefinition = faMagnifyingGlassDollar;
  editable: boolean = false;

  updateEarning(earning: Earning): void {
    const closeBtn: HTMLElement | null = document.getElementById('earning-details-close');
    this.earningService.updateEarning(earning).subscribe({
      next: (): void => {
        if (closeBtn) {
          closeBtn.click();
        }
        displaySuccessSnackBar(this.snackBar, 'Successfully updated an earning.');
        this.editable = false;
        this.needRefresh.emit();
      },
      error: (error): void => {
        if (closeBtn) {
          closeBtn.click();
        }
        displayErrorSnackBar(this.snackBar, 'Earning update failed.');
        console.log(error.error);
      }
    });
  }

  deleteEarning(): void {
    const closeBtn: HTMLElement | null = document.getElementById('earning-details-close');
    this.earningService.deleteEarning(this.earning.id)?.subscribe({
      next: (): void => {
        if (closeBtn) {
          closeBtn.click();
        }
        displaySuccessSnackBar(this.snackBar, 'Successfully deleted an earning.');
        this.needRefresh.emit();
      },
      error: (error): void => {
        if (closeBtn) {
          closeBtn.click();
        }
        displayErrorSnackBar(this.snackBar, 'Earning deletion failed.');
        console.log(error.error);
      }
    });
  }
}
