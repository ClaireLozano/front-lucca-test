import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EXPENSES_STATE_FEATURE_KEY, ExpensesState } from '../reducers/expenses-state.reducer';

export const selectExpensesStateState = createFeatureSelector<ExpensesState>(EXPENSES_STATE_FEATURE_KEY);

export const selectExpenses = createSelector(selectExpensesStateState, (state: ExpensesState) => state.expenses);
export const selectNumber = createSelector(selectExpensesStateState, (state: ExpensesState) => state.numberExpenses);
export const selectCallStatus = createSelector(selectExpensesStateState, (state: ExpensesState) => state.callStatus);
