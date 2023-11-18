import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExpensesResolver } from './resolvers/expenses-resolver.service';
import { ExpensesPageComponent } from './components/expenses-page/expenses-page.component';
import { StoreModule } from '@ngrx/store';
import { ExpensesStateEffects, expensesStateReducer } from '@front-lucca-test/states/expenses-state';
import { EffectsModule } from '@ngrx/effects';

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
	imports: [
		RouterModule.forChild(expensesPageRoutes),
		StoreModule.forFeature('expensesState', expensesStateReducer),
		EffectsModule.forRoot([ExpensesStateEffects]),
	],
})
export class ExpensesPageRoutingModule {}
