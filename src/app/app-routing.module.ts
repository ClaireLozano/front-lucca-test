import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ExpensesStateEffects, expensesStateReducer } from '@front-lucca-test/states/expenses-state';

export const appRoutes: Route[] = [
	{ path: '', redirectTo: 'expenses' },
	{
		path: 'expenses',
		loadChildren: () => import('@front-lucca-test/expenses').then((m) => m.ExpensesPageModule),
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [
		RouterModule.forRoot(appRoutes),
		StoreModule.forRoot({}),
		EffectsModule.forRoot([ExpensesStateEffects]),
		StoreModule.forFeature('expensesState', expensesStateReducer),
	],
})
export class AppRoutingModule {}
