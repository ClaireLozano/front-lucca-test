import { ExpensesStateEntity } from './expenses-state.models';
import { expensesStateAdapter, ExpensesStatePartialState, initialExpensesStateState } from './reducers/expenses-state.reducer';
import * as ExpensesStateSelectors from './expenses-state.selectors';

describe('ExpensesState Selectors', () => {
	const ERROR_MSG = 'No Error Available';
	const getExpensesStateId = (it: ExpensesStateEntity) => it.id;
	const createExpensesStateEntity = (id: string, name = '') =>
		({
			id,
			name: name || `name-${id}`,
		} as ExpensesStateEntity);

	let state: ExpensesStatePartialState;

	beforeEach(() => {
		state = {
			expensesState: expensesStateAdapter.setAll(
				[createExpensesStateEntity('PRODUCT-AAA'), createExpensesStateEntity('PRODUCT-BBB'), createExpensesStateEntity('PRODUCT-CCC')],
				{
					...initialExpensesStateState,
					selectedId: 'PRODUCT-BBB',
					error: ERROR_MSG,
					loaded: true,
				},
			),
		};
	});

	describe('ExpensesState Selectors', () => {
		it('selectAllExpensesState() should return the list of ExpensesState', () => {
			const results = ExpensesStateSelectors.selectAllExpensesState(state);
			const selId = getExpensesStateId(results[1]);

			expect(results.length).toBe(3);
			expect(selId).toBe('PRODUCT-BBB');
		});

		it('selectEntity() should return the selected Entity', () => {
			const result = ExpensesStateSelectors.selectEntity(state) as ExpensesStateEntity;
			const selId = getExpensesStateId(result);

			expect(selId).toBe('PRODUCT-BBB');
		});

		it('selectExpensesStateLoaded() should return the current "loaded" status', () => {
			const result = ExpensesStateSelectors.selectExpensesStateLoaded(state);

			expect(result).toBe(true);
		});

		it('selectExpensesStateError() should return the current "error" state', () => {
			const result = ExpensesStateSelectors.selectExpensesStateError(state);

			expect(result).toBe(ERROR_MSG);
		});
	});
});
