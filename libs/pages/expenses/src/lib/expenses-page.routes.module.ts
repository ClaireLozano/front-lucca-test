import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExpensesResolver } from './resolvers/expenses-resolver.service';
import { ExpensesPageComponent } from './components/expenses-page/expenses-page.component';
import { ExpensesStateModule } from '@front-lucca-test/states/expenses-state';

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
	//providers: [provideState(EXPENSES_STATE_FEATURE_KEY, expensesStateReducer), provideEffects(ExpensesStateEffects)],
	imports: [RouterModule.forChild(expensesPageRoutes), ExpensesStateModule],
})
export class ExpensesPageRoutingModule {}
