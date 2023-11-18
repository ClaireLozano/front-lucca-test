import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, mergeMap, map } from 'rxjs';
import * as ExpensesStateActions from '../actions/expenses-state.actions';
import { ExpensesService } from '../services/expenses.service';
import { ResponseGetExpenses } from '../models/get-expenses/get-expenses-response.interface';
import { RequestAddExpense } from '../models/add-expense/add-expense-request.interface';
import { RequestEditExpense } from '../models/edit-expense/edit-expense-request.interface';

@Injectable()
export class ExpensesStateEffects {
	private actions$ = inject(Actions);

	constructor(private expensesService: ExpensesService) {}

	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ExpensesStateActions.initExpensesState),
			mergeMap(() =>
				this.expensesService.getExpenses({ page: 5, limit: 10 }).pipe(
					map((result: ResponseGetExpenses) =>
						ExpensesStateActions.loadExpensesStateSuccess({ expenses: result.items, numberExpenses: result.count }),
					),
					catchError(() => of(ExpensesStateActions.loadExpensesStateFailure())),
				),
			),
		),
	);

	add$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ExpensesStateActions.addExpenseState),
			mergeMap((requestAddExpense: RequestAddExpense) =>
				this.expensesService.addExpense(requestAddExpense).pipe(
					map(() => ExpensesStateActions.addExpenseStateSuccess(), ExpensesStateActions.initExpensesState()),
					catchError(() => of(ExpensesStateActions.addExpenseStateFailure())),
				),
			),
		),
	);

	edit$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ExpensesStateActions.editExpenseState),
			mergeMap((requestEditExpense: RequestEditExpense) =>
				this.expensesService.editExpense(requestEditExpense).pipe(
					map(() => ExpensesStateActions.editExpenseStateSuccess(), ExpensesStateActions.initExpensesState()),
					catchError(() => of(ExpensesStateActions.editExpenseStateFailure())),
				),
			),
		),
	);
}
