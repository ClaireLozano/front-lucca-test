import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExpensesResolver } from './pages/expenses-page/resolvers/expenses-resolver.service';
import { ExpensesPageComponent } from './pages/expenses-page/components/expenses-page/expenses-page.component';
import { ExpensesStateModule } from '@front-lucca-test/states/expenses-state';
import { ExpenseResolver } from './pages/edit-expense-page/resolvers/expense-resolver.service';
import { EditExpensePageComponent } from './pages/edit-expense-page/components/edit-expense-page.component';
import { AddExpensePageComponent } from './pages/add-expense-page/components/add-expense-page.component';
import { ErrorExpensePageComponent } from './pages/error-expense-page/components/error-expense-page.component';

export const expensesPageRoutes: Route[] = [
	{
		path: 'add',
		component: AddExpensePageComponent,
	},
	{
		path: 'error',
		component: ErrorExpensePageComponent,
	},
	{
		path: ':id',
		component: EditExpensePageComponent,
		resolve: {
			expense: ExpenseResolver,
		},
	},
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
	imports: [RouterModule.forChild(expensesPageRoutes), ExpensesStateModule],
})
export class ExpensesPageRoutingModule {}
