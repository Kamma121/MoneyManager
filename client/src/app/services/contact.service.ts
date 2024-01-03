import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Contact} from "../shared/Contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {
  }

  sendEmail(contactForm: Contact) {
    return this.http.post('http://localhost:8080/api/contact', contactForm, {responseType: 'text'});
  }
}
