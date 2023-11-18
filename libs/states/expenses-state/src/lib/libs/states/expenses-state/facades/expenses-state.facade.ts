import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ExpensesStateActions from '../actions/expenses-state.actions';
import * as ExpensesStateSelectors from '../selectors/expenses-state.selectors';
import { RequestAddExpense } from '../models/add-expense/add-expense-request.interface';
import { RequestEditExpense } from '../models/edit-expense/edit-expense-request.interface';

@Injectable()
export class ExpensesStateFacade {
	private readonly store = inject(Store);

	/**
	 * Observables
	 */
	public expenses$ = this.store.pipe(select(ExpensesStateSelectors.selectExpenses));
	public number$ = this.store.pipe(select(ExpensesStateSelectors.selectNumber));
	public getExpensesStatus$ = this.store.pipe(select(ExpensesStateSelectors.selectGetExpensesStatus));
	public addExpenseStatus$ = this.store.pipe(select(ExpensesStateSelectors.selectAddExpenseStatus));
	public editExpenseStatus$ = this.store.pipe(select(ExpensesStateSelectors.selectEditExpenseStatus));

	/**
	 * Functions
	 */
	public init(): void {
		this.store.dispatch(ExpensesStateActions.initExpensesState());
	}

	public addExpense(expense: RequestAddExpense): void {
		this.store.dispatch(ExpensesStateActions.addExpenseState(expense));
	}

	public editExpense(expense: RequestEditExpense): void {
		this.store.dispatch(ExpensesStateActions.addExpenseState(expense));
	}
}
