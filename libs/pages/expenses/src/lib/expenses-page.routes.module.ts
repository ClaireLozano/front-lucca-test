import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExpensesResolver } from './resolvers/expenses-resolver.service';
import { ExpensesPageComponent } from './components/expenses-page/expenses-page.component';

export const expensesPageRoutes: Route[] = [
	{
		path: '**',
		component: ExpensesPageComponent,
		resolve: {
			expenses: ExpensesResolver,
		},
	},
];

@NgModule({
	exports: [RouterModule],
	providers: [],
	imports: [RouterModule.forChild(expensesPageRoutes)],
})
export class ExpensesPageRoutingModule {}
