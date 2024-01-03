import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterOutlet} from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NavigationBarComponent} from './home-page/navigation-bar/navigation-bar.component';
import {SignInModalComponent} from './home-page/sign-in-modal/sign-in-modal.component';
import {SignUpModalComponent} from './home-page/sign-up-modal/sign-up-modal.component';
import {CarouselComponent} from './home-page/carousel/carousel.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MenuComponent} from './dashboard/menu/menu.component';
import {OverviewComponent} from './dashboard/overview/overview.component';
import {ExpensesComponent} from './dashboard/expenses/expenses.component';
import {EarningsComponent} from './dashboard/earnings/earnings.component';
import {SavingsComponent} from './dashboard/savings/savings.component';
import {WelcomeHeaderComponent} from './dashboard/welcome-header/welcome-header.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {AddExpenseModalComponent} from './dashboard/expenses/add-expense-modal/add-expense-modal.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ViewAllModalComponent} from './dashboard/expenses/view-all-modal/view-all-modal.component';
import {AddEarningModalComponent} from './dashboard/earnings/add-earning-modal/add-earning-modal.component';
import {EarningDetailsModalComponent} from './dashboard/earnings/earning-details-modal/earning-details-modal.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {AddSavingModalComponent} from './dashboard/savings/add-saving-modal/add-saving-modal.component';
import {DepositModalComponent} from './dashboard/savings/deposit-modal/deposit-modal.component';
import {ProfileComponent} from './dashboard/profile/profile.component';
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {FeaturesComponent} from './home-page/features/features.component';
import {ContactComponent} from './home-page/contact/contact.component';
import {MdbAccordionModule} from "mdb-angular-ui-kit/accordion";
import {MdbModalModule} from "mdb-angular-ui-kit/modal";
import {MdbDropdownDirective, MdbDropdownModule} from "mdb-angular-ui-kit/dropdown";
import {MdbTabsModule} from "mdb-angular-ui-kit/tabs";
import {MdbCollapseModule} from "mdb-angular-ui-kit/collapse";
import {MdbPopoverModule} from "mdb-angular-ui-kit/popover";
import {MdbCheckboxModule} from "mdb-angular-ui-kit/checkbox";

export function tokenGetter(): string | null {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DashboardComponent,
    NavigationBarComponent,
    SignInModalComponent,
    SignUpModalComponent,
    CarouselComponent,
    MenuComponent,
    OverviewComponent,
    ExpensesComponent,
    EarningsComponent,
    SavingsComponent,
    WelcomeHeaderComponent,
    AddExpenseModalComponent,
    ViewAllModalComponent,
    AddEarningModalComponent,
    EarningDetailsModalComponent,
    AddSavingModalComponent,
    DepositModalComponent,
    ProfileComponent,
    FeaturesComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    }),
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
