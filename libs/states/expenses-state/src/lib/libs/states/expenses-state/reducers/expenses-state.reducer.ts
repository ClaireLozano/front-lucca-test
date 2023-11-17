import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ExpensesStateActions from '../actions/expenses-state.actions';
import { ExpensesStateEntity } from '../expenses-state.models';

export const EXPENSES_STATE_FEATURE_KEY = 'expensesState';

export interface ExpensesStateState extends EntityState<ExpensesStateEntity> {
	selectedId?: string | number; // which ExpensesState record has been selected
	loaded: boolean; // has the ExpensesState list been loaded
	error?: string | null; // last known error (if any)
}

export interface ExpensesStatePartialState {
	readonly [EXPENSES_STATE_FEATURE_KEY]: ExpensesStateState;
}

export const expensesStateAdapter: EntityAdapter<ExpensesStateEntity> = createEntityAdapter<ExpensesStateEntity>();

export const initialExpensesStateState: ExpensesStateState = expensesStateAdapter.getInitialState({
	// set initial required properties
	loaded: false,
});

const reducer = createReducer(
	initialExpensesStateState,
	on(ExpensesStateActions.initExpensesState, (state) => ({ ...state, loaded: false, error: null })),
	on(ExpensesStateActions.loadExpensesStateSuccess, (state, { expensesState }) =>
		expensesStateAdapter.setAll(expensesState, { ...state, loaded: true }),
	),
	on(ExpensesStateActions.loadExpensesStateFailure, (state, { error }) => ({ ...state, error })),
);

export function expensesStateReducer(state: ExpensesStateState | undefined, action: Action) {
	return reducer(state, action);
}
