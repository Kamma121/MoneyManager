import {Component, EventEmitter, Output} from '@angular/core';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Earning} from "../../../shared/Earning";
import {EarningService} from "../../../services/earning.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {displayErrorSnackBar, displaySuccessSnackBar} from "../../../shared/functions";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-add-earning-modal',
  templateUrl: './add-earning-modal.component.html',
  styleUrls: ['./add-earning-modal.component.css']
})
export class AddEarningModalComponent {
  @Output() earningAdded: EventEmitter<void> = new EventEmitter<void>();
  userEarnings: Earning[] = [this.createEmptyEarning()];
  protected readonly deleteIcon: IconDefinition = faTimes;

  constructor(private earningService: EarningService, private snackBar: MatSnackBar) {
  }

  createEmptyEarning(): Earning {
    return {
      id: null,
      date: null,
      source: '',
      amount: 0
    };
  }

  addEarning(): void {
    this.userEarnings.push(this.createEmptyEarning());
  }

  removeEarning(i: number): void {
    this.userEarnings.splice(i, 1);
  }


  onSubmitEarnings(): void {
    this.earningService.addEarnings(this.userEarnings).subscribe({
      next: (): void => {
        const closeBtn: HTMLElement | null = document.getElementById('add-earning-close');
        if (closeBtn) {
          closeBtn.click();
        }
        if (this.userEarnings.length > 1) {
          displaySuccessSnackBar(this.snackBar, `Successfully added ${this.userEarnings.length} earnings`);
        } else {
          displaySuccessSnackBar(this.snackBar, `Successfully added 1 earning`);
        }
        this.userEarnings = [];
        this.addEarning();
        this.earningAdded.emit();
      },
      error: (err): void => {
        displayErrorSnackBar(this.snackBar, 'Earning submission failed.');
        console.log(err.error);
      }
    })
  }
}
