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
	public getExpensesStatus$ = this.store.pipe(select(ExpensesStateSelectors.selectGetExpensesStatus));

	/**
	 * Signals
	 */
	readonly expensesSignal = this.store.selectSignal(ExpensesStateSelectors.selectExpenses);
	readonly numberSignal = this.store.selectSignal(ExpensesStateSelectors.selectNumber);
	readonly getExpensesStatusSignal = this.store.selectSignal(ExpensesStateSelectors.selectGetExpensesStatus);
	readonly addExpenseStatusSignal = this.store.selectSignal(ExpensesStateSelectors.selectAddExpenseStatus);
	readonly editExpenseStatusSignal = this.store.selectSignal(ExpensesStateSelectors.selectEditExpenseStatus);

	/**
	 * Functions
	 */
	public init(): void {
		this.store.dispatch(ExpensesStateActions.initExpensesState());
	}

	public initAddExpense(): void {
		this.store.dispatch(ExpensesStateActions.initAddExpenseState());
	}

	public initEditExpense(): void {
		this.store.dispatch(ExpensesStateActions.initEditExpenseState());
	}

	public addExpense(expense: RequestAddExpense): void {
		this.store.dispatch(ExpensesStateActions.addExpenseState({ request: expense }));
	}

	public editExpense(expense: RequestEditExpense): void {
		this.store.dispatch(ExpensesStateActions.editExpenseState({ request: expense }));
	}
}
