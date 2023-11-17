import { createAction, props } from '@ngrx/store';
import { Expense } from '../models/expense/expense.interface';

export const initExpensesState = createAction('[ExpensesState Page] Init');
export const loadExpensesStateSuccess = createAction(
	'[ExpensesState/API] Load ExpensesState Success',
	props<{ expenses: Expense[]; numberExpenses: number }>(),
);
export const loadExpensesStateFailure = createAction('[ExpensesState/API] Load ExpensesState Failure');
