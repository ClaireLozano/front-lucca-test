import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ExpensesStateActions from '../actions/expenses-state.actions';
import { Expense } from '../models/expense/expense.interface';
export const EXPENSES_STATE_FEATURE_KEY = 'expensesState';

export const CallStatus = {
	empty: 'empty',
	loading: 'loading',
	success: 'success',
	error: 'error',
};

export interface ExpensesState extends EntityState<Expense> {
	expenses: Expense[];
	numberExpenses: number | undefined;
	callStatus: string;
}

export interface ExpensesStatePartialState {
	readonly [EXPENSES_STATE_FEATURE_KEY]: ExpensesState;
}

export const expensesState: EntityAdapter<Expense> = createEntityAdapter<Expense>();

export const initialExpensesStateState: ExpensesState = expensesState.getInitialState({
	expenses: [],
	numberExpenses: undefined,
	callStatus: CallStatus.empty,
});

const reducer = createReducer(
	initialExpensesStateState,
	on(ExpensesStateActions.initExpensesState, (state) => ({
		...state,
		callStatus: CallStatus.loading,
	})),
	on(ExpensesStateActions.loadExpensesStateSuccess, (state, { expenses, numberExpenses }) => ({
		...state,
		expenses: expenses,
		numberExpenses: numberExpenses,
		callStatus: CallStatus.success,
	})),
	on(ExpensesStateActions.loadExpensesStateFailure, (state) => ({
		...state,
		expenses: [],
		numberExpenses: undefined,
		callStatus: CallStatus.error,
	})),
);

export function expensesStateReducer(state: ExpensesState | undefined, action: Action) {
	return reducer(state, action);
}
