import { Route, RouterModule } from '@angular/router';
import { ExpensesPageComponent } from './lib/components/expenses-page/expenses-page.component';
import { NgModule } from '@angular/core';
import { ExpensesPageResolver } from './lib/resolvers/expenses-page-resolver.service';

export const expensesPageRoutes: Route[] = [
	{
		path: '**',
		component: ExpensesPageComponent,
		resolve: {
			expenses: ExpensesPageResolver,
		},
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(expensesPageRoutes)],
})
export class ExpensesPageRoutingModule {}
