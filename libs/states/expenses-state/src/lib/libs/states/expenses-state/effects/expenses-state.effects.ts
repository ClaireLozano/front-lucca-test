import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as ExpensesStateActions from '../actions/expenses-state.actions';
import * as ExpensesStateFeature from '../reducers/expenses-state.reducer';

@Injectable()
export class ExpensesStateEffects {
	private actions$ = inject(Actions);

	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ExpensesStateActions.initExpensesState),
			switchMap(() => of(ExpensesStateActions.loadExpensesStateSuccess({ expensesState: [] }))),
			catchError((error) => {
				console.error('Error', error);
				return of(ExpensesStateActions.loadExpensesStateFailure({ error }));
			}),
		),
	);
}
