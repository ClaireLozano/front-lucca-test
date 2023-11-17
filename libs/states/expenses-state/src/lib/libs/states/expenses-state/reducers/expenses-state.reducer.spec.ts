import { Action } from '@ngrx/store';

import * as ExpensesStateActions from './actions/expenses-state.actions';
import { ExpensesStateEntity } from './expenses-state.models';
import { ExpensesStateState, initialExpensesStateState, expensesStateReducer } from './expenses-state.reducer';

describe('ExpensesState Reducer', () => {
	const createExpensesStateEntity = (id: string, name = ''): ExpensesStateEntity => ({
		id,
		name: name || `name-${id}`,
	});

	describe('valid ExpensesState actions', () => {
		it('loadExpensesStateSuccess should return the list of known ExpensesState', () => {
			const expensesState = [createExpensesStateEntity('PRODUCT-AAA'), createExpensesStateEntity('PRODUCT-zzz')];
			const action = ExpensesStateActions.loadExpensesStateSuccess({ expensesState });

			const result: ExpensesStateState = expensesStateReducer(initialExpensesStateState, action);

			expect(result.loaded).toBe(true);
			expect(result.ids.length).toBe(2);
		});
	});

	describe('unknown action', () => {
		it('should return the previous state', () => {
			const action = {} as Action;

			const result = expensesStateReducer(initialExpensesStateState, action);

			expect(result).toBe(initialExpensesStateState);
		});
	});
});
