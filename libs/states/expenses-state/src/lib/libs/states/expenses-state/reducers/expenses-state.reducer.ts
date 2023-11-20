import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ExpensesStateActions from '../actions/expenses-state.actions';
import { Expense } from '../models/expense/expense.interface';
export const EXPENSES_STATE_FEATURE_KEY = 'expensesState';

export const CallStatus = {
	loading: 'loading',
	success: 'success',
	error: 'error',
};

export interface ExpensesState extends EntityState<Expense> {
	expenses: { [key: number]: Expense[] };
	numberExpenses: number | undefined;
	getExpensesStatus: string | undefined;
	addExpenseStatus: string | undefined;
	editExpenseStatus: string | undefined;
	currentPageNumber: number;
}

export interface ExpensesStatePartialState {
	readonly [EXPENSES_STATE_FEATURE_KEY]: ExpensesState;
}

export const expensesState: EntityAdapter<Expense> = createEntityAdapter<Expense>();

export const initialExpensesState: ExpensesState = expensesState.getInitialState({
	expenses: [],
	numberExpenses: undefined,
	getExpensesStatus: undefined,
	addExpenseStatus: undefined,
	editExpenseStatus: undefined,
	currentPageNumber: 0,
});

const reducer = createReducer(
	initialExpensesState,
	// Get expenses reducer
	on(ExpensesStateActions.initExpensesState, (state) => ({
		...state,
		getExpensesStatus: CallStatus.loading,
	})),
	on(ExpensesStateActions.loadExpensesStateSuccess, (state, { expenses, numberExpenses }) => ({
		...state,
		expenses: restructureExpenses(expenses, 5),
		numberExpenses: numberExpenses,
		getExpensesStatus: CallStatus.success,
	})),
	on(ExpensesStateActions.loadExpensesStateFailure, (state) => ({
		...state,
		expenses: {},
		numberExpenses: undefined,
		getExpensesStatus: CallStatus.error,
	})),

	// Add expense reducer
	on(ExpensesStateActions.initAddExpenseState, (state) => ({
		...state,
		addExpenseStatus: undefined,
	})),
	on(ExpensesStateActions.addExpenseState, (state) => ({
		...state,
		addExpenseStatus: CallStatus.loading,
	})),
	on(ExpensesStateActions.addExpenseStateSuccess, (state) => ({
		...state,
		addExpenseStatus: CallStatus.success,
	})),
	on(ExpensesStateActions.addExpenseStateFailure, (state) => ({
		...state,
		addExpenseStatus: CallStatus.error,
	})),

	// Edit expense reducer
	on(ExpensesStateActions.initEditExpenseState, (state) => ({
		...state,
		editExpenseStatus: undefined,
	})),
	on(ExpensesStateActions.editExpenseState, (state) => ({
		...state,
		editExpenseStatus: CallStatus.loading,
	})),
	on(ExpensesStateActions.editExpenseStateSuccess, (state) => ({
		...state,
		editExpenseStatus: CallStatus.success,
	})),
	on(ExpensesStateActions.editExpenseStateFailure, (state) => ({
		...state,
		editExpenseStatus: CallStatus.error,
	})),

	// Current page number
	on(ExpensesStateActions.setCurrentPageNumber, (state, { currentPageNumber }) => ({
		...state,
		currentPageNumber: currentPageNumber,
	})),
);

export function expensesStateReducer(state: ExpensesState | undefined, action: Action) {
	return reducer(state, action);
}

function restructureExpenses(expenses: Expense[], chunkSize: number): { [key: number]: Expense[] } {
	return expenses.reduce((result: { [key: number]: Expense[] }, expense: Expense, index: number) => {
		const chunkIndex = Math.floor(index / chunkSize);

		if (!result[chunkIndex]) {
			result[chunkIndex] = [];
		}

		result[chunkIndex].push(expense);

		return result;
	}, {});
}
