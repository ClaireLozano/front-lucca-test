import { Route, RouterModule } from '@angular/router';
import { ExpensesPageComponent } from './lib/components/expenses-page/expenses-page.component';
import { NgModule } from '@angular/core';

export const expensesPageRoutes: Route[] = [{ path: '', pathMatch: 'full', component: ExpensesPageComponent }];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(expensesPageRoutes)],
})
export class ExpensesPageRoutingModule {}
