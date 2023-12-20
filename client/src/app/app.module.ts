import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterOutlet} from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationBarComponent } from './home-page/navigation-bar/navigation-bar.component';
import { SignInModalComponent } from './home-page/sign-in-modal/sign-in-modal.component';
import { SignUpModalComponent } from './home-page/sign-up-modal/sign-up-modal.component';
import { CarouselComponent } from './home-page/carousel/carousel.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DashboardComponent,
    NavigationBarComponent,
    SignInModalComponent,
    SignUpModalComponent,
    CarouselComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterOutlet,
        NgbModule,
        FontAwesomeModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
