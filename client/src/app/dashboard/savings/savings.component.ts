import {Component} from '@angular/core';
import {faDownload, faPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css']
})
export class SavingsComponent {

  protected readonly downloadIcon = faDownload;
  protected readonly plusIcon = faPlus;
}
