import { createAction, props } from '@ngrx/store';
import { ExpensesStateEntity } from '../expenses-state.models';

export const initExpensesState = createAction('[ExpensesState Page] Init');

export const loadExpensesStateSuccess = createAction(
	'[ExpensesState/API] Load ExpensesState Success',
	props<{ expensesState: ExpensesStateEntity[] }>(),
);

export const loadExpensesStateFailure = createAction('[ExpensesState/API] Load ExpensesState Failure', props<{ error: any }>());
