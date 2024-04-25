import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EXPENSES_STATE_FEATURE_KEY, ExpensesState } from '../reducers/expenses-state.reducer';

export const selectExpensesState = createFeatureSelector<ExpensesState>(EXPENSES_STATE_FEATURE_KEY);

export const selectExpenses = createSelector(selectExpensesState, (state: ExpensesState) => state.expenses);
export const selectEditingExpense = createSelector(selectExpensesState, (state: ExpensesState) => state.editingExpense);
export const selectNumber = createSelector(selectExpensesState, (state: ExpensesState) => state.numberExpenses);
export const selectCurrentPageNumber = createSelector(selectExpensesState, (state: ExpensesState) => state.currentPageNumber);

export const selectGetExpensesStatus = createSelector(selectExpensesState, (state: ExpensesState) => state.getExpensesStatus);
export const selectAddExpenseStatus = createSelector(selectExpensesState, (state: ExpensesState) => state.addExpenseStatus);
export const selectEditExpenseStatus = createSelector(selectExpensesState, (state: ExpensesState) => state.editExpenseStatus);
