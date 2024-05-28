import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ExpensesStateActions from '../actions/expenses-state.actions';
import * as ExpensesStateSelectors from '../selectors/expenses-state.selectors';
import { RequestAddExpense } from '../models/add-expense/add-expense-request.interface';
import { Expense } from '../models/expense/expense.interface';
import { RequestEditExpense } from '../models/edit-expense/edit-expense-request.interface';

@Injectable()
export class ExpensesStateFacade {
	private readonly store = inject(Store);

	/**
	 * Signals
	 */
	readonly expensesSignal = this.store.selectSignal(ExpensesStateSelectors.selectExpenses);
	readonly numberSignal = this.store.selectSignal(ExpensesStateSelectors.selectNumber);
	readonly getExpensesStatusSignal = this.store.selectSignal(ExpensesStateSelectors.selectGetExpensesStatus);
	readonly addExpenseStatusSignal = this.store.selectSignal(ExpensesStateSelectors.selectAddExpenseStatus);
	readonly editExpenseStatusSignal = this.store.selectSignal(ExpensesStateSelectors.selectEditExpenseStatus);
	readonly currentPageNumberSignal = this.store.selectSignal(ExpensesStateSelectors.selectCurrentPageNumber);
	readonly editingExpense = this.store.selectSignal(ExpensesStateSelectors.selectEditingExpense);

	/**
	 * Functions
	 */
	public init(): void {
		this.store.dispatch(ExpensesStateActions.initExpensesState());
	}

	public loadExpenses(): void {
		this.store.dispatch(ExpensesStateActions.loadExpensesState());
	}

	public loadExpenseByIdStateSuccess(expense: Expense): void {
		this.store.dispatch(ExpensesStateActions.loadExpenseByIdStateSuccess({ expense }));
	}

	public setExpenses(result: Expense[]): void {
		this.store.dispatch(ExpensesStateActions.loadExpensesStateSuccess({ expenses: result }));
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

	public setCurrentPageNumber(currentPageNumber: number): void {
		this.store.dispatch(ExpensesStateActions.setCurrentPageNumber({ currentPageNumber: currentPageNumber }));
	}
}
