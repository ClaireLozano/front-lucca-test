import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ExpensesStateActions from '../actions/expenses-state.actions';
import { ExpensesStateEffects } from './expenses-state.effects';

describe('ExpensesStateEffects', () => {
	let actions: Observable<Action>;
	let effects: ExpensesStateEffects;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [],
			providers: [ExpensesStateEffects, provideMockActions(() => actions), provideMockStore()],
		});

		effects = TestBed.inject(ExpensesStateEffects);
	});

	describe('init$', () => {
		it('should work', () => {
			actions = hot('-a-|', { a: ExpensesStateActions.initExpensesState() });

			const expected = hot('-a-|', { a: ExpensesStateActions.loadExpensesStateSuccess({ expensesState: [] }) });

			expect(effects.init$).toBeObservable(expected);
		});
	});
});
