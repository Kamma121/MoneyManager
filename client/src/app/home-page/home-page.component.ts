import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: string | null): void => {
      if (fragment) {
        const element: Element | null = document.querySelector(`#${fragment}`);
        if (element) {
          element.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      }
    });
  }

}

