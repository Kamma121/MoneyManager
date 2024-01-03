import {Component} from '@angular/core';
import {ContactService} from "../../services/contact.service";
import {Contact} from "../../shared/Contact";
import {displaySuccessSnackBar} from "../../shared/functions";
import {MatSnackBar} from "@angular/material/snack-bar";
import {isValidEmail} from "../sign-up-modal/sign-up-modal.component";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private contactService: ContactService, private snackBar: MatSnackBar) {}

  contactBody: Contact = {
    name: '',
    email: '',
    message: ''
  }
  protected readonly isValidEmail = isValidEmail;

  createEmptyForm(): void {
    this.contactBody = {
      name: '',
      email: '',
      message: ''
    }
  }

  onMessageSubmit(): void {
    this.contactService.sendEmail(this.contactBody).subscribe({
      next: (): void => {
        displaySuccessSnackBar(this.snackBar, 'Email was successfully sent.');
        this.createEmptyForm();
      }
    })
  }
}
