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
	editingExpense?: Expense;
	numberExpenses?: number;
	getExpensesStatus?: string;
	getExpenseStatus?: string;
	addExpenseStatus?: string;
	editExpenseStatus?: string;
	loadEditingExpenseStatus?: string;
	currentPageNumber: number;
}

export interface ExpensesStatePartialState {
	readonly [EXPENSES_STATE_FEATURE_KEY]: ExpensesState;
}

export const expensesState: EntityAdapter<Expense> = createEntityAdapter<Expense>();

export const initialExpensesState: ExpensesState = expensesState.getInitialState({
	expenses: {},
	editingExpense: undefined,
	numberExpenses: undefined,
	getExpensesStatus: undefined,
	getExpenseStatus: undefined,
	addExpenseStatus: undefined,
	editExpenseStatus: undefined,
	loadEditingExpenseStatus: undefined,
	currentPageNumber: 0,
});

const reducer = createReducer(
	initialExpensesState,
	// Get expenses reducer
	on(ExpensesStateActions.loadExpensesState, (state) => ({
		...state,
		getExpensesStatus: CallStatus.loading,
	})),
	on(ExpensesStateActions.loadExpensesStateSuccess, (state, { expenses }) => ({
		...state,
		expenses: restructureExpenses(expenses, 5),
		numberExpenses: expenses.length,
		getExpensesStatus: CallStatus.success,
	})),
	on(ExpensesStateActions.loadExpensesStateFailure, (state) => ({
		...state,
		expenses: {},
		numberExpenses: undefined,
		getExpensesStatus: CallStatus.error,
	})),

	// Get expense by id reducer
	on(ExpensesStateActions.loadExpenseByIdStateSuccess, (state, { expense }) => ({
		...state,
		editingExpense: expense,
		editExpenseStatus: undefined,
		loadEditingExpenseStatus: CallStatus.success,
	})),
	on(ExpensesStateActions.loadExpenseByIdStateFailure, (state) => ({
		...state,
		editingExpense: undefined,
		editExpenseStatus: undefined,
		loadEditingExpenseStatus: CallStatus.error,
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
		currentPageNumber: 0,
	})),
	on(ExpensesStateActions.addExpenseStateFailure, (state) => ({
		...state,
		addExpenseStatus: CallStatus.error,
		currentPageNumber: 0,
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
		editingExpense: undefined,
		editExpenseStatus: CallStatus.success,
		getExpenseStatus: undefined,
		loadEditingExpenseStatus: undefined,
	})),
	on(ExpensesStateActions.editExpenseStateFailure, (state) => ({
		...state,
		editExpenseStatus: CallStatus.error,
		getExpenseStatus: undefined,
		loadEditingExpenseStatus: undefined,
		editingExpense: undefined,
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
	if (!expenses) {
		return [];
	}

	return expenses.reduce((result: { [key: number]: Expense[] }, expense: Expense, index: number) => {
		const chunkIndex = Math.floor(index / chunkSize);

		if (!result[chunkIndex]) {
			result[chunkIndex] = [];
		}

		result[chunkIndex].push(expense);
		return result;
	}, {});
}
