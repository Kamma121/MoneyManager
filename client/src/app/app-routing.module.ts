import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomePageComponent} from "./home-page/home-page.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ExpensesComponent} from "./dashboard/expenses/expenses.component";
import {OverviewComponent} from "./dashboard/overview/overview.component";
import {EarningsComponent} from "./dashboard/earnings/earnings.component";
import {SavingsComponent} from "./dashboard/savings/savings.component";
import {ProfileComponent} from "./dashboard/profile/profile.component";
import {authGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomePageComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'overview'},
      {path: 'overview', component: OverviewComponent},
      {path: 'expenses', component: ExpensesComponent},
      {path: 'earnings', component: EarningsComponent},
      {path: 'savings', component: SavingsComponent},
      {path: 'profile', component: ProfileComponent}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
