import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, mergeMap, map } from 'rxjs';
import * as ExpensesStateActions from '../actions/expenses-state.actions';
import { ExpensesService } from '../services/expenses.service';
import { ResponseGetExpenses } from '../models/get-expenses/get-expenses-response.interface';

@Injectable()
export class ExpensesStateEffects {
	private actions$ = inject(Actions);

	constructor(private expensesService: ExpensesService) {}

	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ExpensesStateActions.initExpensesState),
			mergeMap(() =>
				this.expensesService.getExpenses({ page: 5, limit: 10 }).pipe(
					map((result: ResponseGetExpenses) => {
						return ExpensesStateActions.loadExpensesStateSuccess({ expenses: result.items, numberExpenses: result.count });
					}),
					catchError(() => {
						return of(ExpensesStateActions.loadExpensesStateFailure());
					}),
				),
			),
		),
	);
}
