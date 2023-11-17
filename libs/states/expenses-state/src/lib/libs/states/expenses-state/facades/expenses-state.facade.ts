import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as ExpensesStateActions from '../actions/expenses-state.actions';
import * as ExpensesStateFeature from '../reducers/expenses-state.reducer';
import * as ExpensesStateSelectors from '../selectors/expenses-state.selectors';

@Injectable()
export class ExpensesStateFacade {
	private readonly store = inject(Store);

	/**
	 * Combine pieces of state using createSelector,
	 * and expose them as observables through the facade.
	 */
	loaded$ = this.store.pipe(select(ExpensesStateSelectors.selectExpensesStateLoaded));
	allExpensesState$ = this.store.pipe(select(ExpensesStateSelectors.selectAllExpensesState));
	selectedExpensesState$ = this.store.pipe(select(ExpensesStateSelectors.selectEntity));

	/**
	 * Use the initialization action to perform one
	 * or more tasks in your Effects.
	 */
	init() {
		this.store.dispatch(ExpensesStateActions.initExpensesState());
	}
}
