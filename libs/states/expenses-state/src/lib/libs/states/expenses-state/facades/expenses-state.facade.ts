import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ExpensesStateActions from '../actions/expenses-state.actions';
import * as ExpensesStateSelectors from '../selectors/expenses-state.selectors';

@Injectable()
export class ExpensesStateFacade {
	private readonly store = inject(Store);

	/**
	 * Combine pieces of state using createSelector,
	 * and expose them as observables through the facade.
	 */
	expenses$ = this.store.pipe(select(ExpensesStateSelectors.selectExpenses));
	callStatus$ = this.store.pipe(select(ExpensesStateSelectors.selectCallStatus));
	number$ = this.store.pipe(select(ExpensesStateSelectors.selectNumber));

	/**
	 * Use the initialization action to perform one
	 * or more tasks in your Effects.
	 */
	init() {
		this.store.dispatch(ExpensesStateActions.initExpensesState());
	}
}
