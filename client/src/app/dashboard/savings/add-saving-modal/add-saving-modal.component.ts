import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Saving} from "../../../shared/Saving";
import {SavingService} from "../../../services/saving.service";
import {displayErrorSnackBar, displaySuccessSnackBar} from "../../../shared/functions";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-saving-modal',
  templateUrl: './add-saving-modal.component.html',
  styleUrls: ['./add-saving-modal.component.css']
})
export class AddSavingModalComponent {

  saving: Saving = this.createEmptySaving();
  @Input() banksCounter: number = 0;
  @Output() refreshSavings = new EventEmitter;
  constructor(private savingService: SavingService, private snackBar: MatSnackBar) {
  }

  createEmptySaving(): Saving {
    return {
      id: null,
      name: '',
      currentAmount: null,
      targetAmount: null
    }
  }

  onSubmitSaving():void {
    const closeBtn = document.getElementById('add-saving-close');
    if (this.banksCounter >= 3) {
      if (closeBtn) {
        closeBtn.click();
      }
      displayErrorSnackBar(this.snackBar, "You've reached the piggy bank limit.");
      return;
    }

    this.savingService.addSaving(this.saving).subscribe({
      next: () => {
        if (closeBtn) {
          closeBtn.click();
        }
        this.saving = this.createEmptySaving();
        displaySuccessSnackBar(this.snackBar, 'Successfully added a piggy bank!');
        this.refreshSavings.emit();
      },
      error: (error) => {
        if (closeBtn) {
          closeBtn.click();
        }
        console.error(error.error);
        displayErrorSnackBar(this.snackBar, 'Saving submission failed.');
      }
    })
  }
}
