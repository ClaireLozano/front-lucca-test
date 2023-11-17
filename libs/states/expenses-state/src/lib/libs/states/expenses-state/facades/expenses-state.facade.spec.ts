import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as ExpensesStateActions from '../actions/expenses-state.actions';
import { ExpensesStateEffects } from '../effects/expenses-state.effects';
import { ExpensesStateFacade } from './expenses-state.facade';
import { ExpensesStateEntity } from '../expenses-state.models';
import { EXPENSES_STATE_FEATURE_KEY, ExpensesStateState, initialExpensesStateState, expensesStateReducer } from '../reducers/expenses-state.reducer';
import * as ExpensesStateSelectors from '../selectors/expenses-state.selectors';

interface TestSchema {
	expensesState: ExpensesStateState;
}

describe('ExpensesStateFacade', () => {
	let facade: ExpensesStateFacade;
	let store: Store<TestSchema>;
	const createExpensesStateEntity = (id: string, name = ''): ExpensesStateEntity => ({
		id,
		name: name || `name-${id}`,
	});

	describe('used in NgModule', () => {
		beforeEach(() => {
			@NgModule({
				imports: [StoreModule.forFeature(EXPENSES_STATE_FEATURE_KEY, expensesStateReducer), EffectsModule.forFeature([ExpensesStateEffects])],
				providers: [ExpensesStateFacade],
			})
			class CustomFeatureModule {}

			@NgModule({
				imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
			})
			class RootModule {}
			TestBed.configureTestingModule({ imports: [RootModule] });

			store = TestBed.inject(Store);
			facade = TestBed.inject(ExpensesStateFacade);
		});

		/**
		 * The initially generated facade::loadAll() returns empty array
		 */
		it('loadAll() should return empty list with loaded == true', async () => {
			let list = await readFirst(facade.allExpensesState$);
			let isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(0);
			expect(isLoaded).toBe(false);

			facade.init();

			list = await readFirst(facade.allExpensesState$);
			isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(0);
			expect(isLoaded).toBe(true);
		});

		/**
		 * Use `loadExpensesStateSuccess` to manually update list
		 */
		it('allExpensesState$ should return the loaded list; and loaded flag == true', async () => {
			let list = await readFirst(facade.allExpensesState$);
			let isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(0);
			expect(isLoaded).toBe(false);

			store.dispatch(
				ExpensesStateActions.loadExpensesStateSuccess({
					expensesState: [createExpensesStateEntity('AAA'), createExpensesStateEntity('BBB')],
				}),
			);

			list = await readFirst(facade.allExpensesState$);
			isLoaded = await readFirst(facade.loaded$);

			expect(list.length).toBe(2);
			expect(isLoaded).toBe(true);
		});
	});
});
