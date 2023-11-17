import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EXPENSES_STATE_FEATURE_KEY, ExpensesStateState, expensesStateAdapter } from '../reducers/expenses-state.reducer';

// Lookup the 'ExpensesState' feature state managed by NgRx
export const selectExpensesStateState = createFeatureSelector<ExpensesStateState>(EXPENSES_STATE_FEATURE_KEY);

const { selectAll, selectEntities } = expensesStateAdapter.getSelectors();

export const selectExpensesStateLoaded = createSelector(selectExpensesStateState, (state: ExpensesStateState) => state.loaded);

export const selectExpensesStateError = createSelector(selectExpensesStateState, (state: ExpensesStateState) => state.error);

export const selectAllExpensesState = createSelector(selectExpensesStateState, (state: ExpensesStateState) => selectAll(state));

export const selectExpensesStateEntities = createSelector(selectExpensesStateState, (state: ExpensesStateState) => selectEntities(state));

export const selectSelectedId = createSelector(selectExpensesStateState, (state: ExpensesStateState) => state.selectedId);

export const selectEntity = createSelector(selectExpensesStateEntities, selectSelectedId, (entities, selectedId) =>
	selectedId ? entities[selectedId] : undefined,
);
