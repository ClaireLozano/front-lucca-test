import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, switchMap, filter } from 'rxjs';
import * as ExpensesStateActions from '../actions/expenses-state.actions';
import { ExpensesService } from '../services/expenses.service';
import { RequestAddExpense } from '../models/add-expense/add-expense-request.interface';
import { RequestEditExpense } from '../models/edit-expense/edit-expense-request.interface';
import { Expense } from '../models/expense/expense.interface';

@Injectable()
export class ExpensesStateEffects {
	private actions$ = inject(Actions);

	constructor(private expensesService: ExpensesService) {}

	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ExpensesStateActions.loadExpensesState),
			switchMap(() =>
				this.expensesService.getExpenses().pipe(
					map((result: Expense[]) => ExpensesStateActions.loadExpensesStateSuccess({ expenses: result })),
					catchError(() => of(ExpensesStateActions.loadExpensesStateFailure())),
				),
			),
		),
	);

	add$ = createEffect(() =>
		this.actions$.pipe(
			filter(({ type }) => type === ExpensesStateActions.addExpenseState.type),
			switchMap(({ request }: { request: RequestAddExpense }) =>
				this.expensesService.addExpense(request).pipe(
					map(() => ExpensesStateActions.addExpenseStateSuccess(), ExpensesStateActions.loadExpensesState()),
					catchError(() => of(ExpensesStateActions.addExpenseStateFailure())),
				),
			),
		),
	);

	edit$ = createEffect(() =>
		this.actions$.pipe(
			filter(({ type }) => type === ExpensesStateActions.editExpenseState.type),
			switchMap(({ request }: { request: RequestEditExpense }) =>
				this.expensesService.editExpense(request).pipe(
					map(() => ExpensesStateActions.editExpenseStateSuccess(), ExpensesStateActions.initExpensesState()),
					catchError(() => of(ExpensesStateActions.editExpenseStateFailure())),
				),
			),
		),
	);
}
