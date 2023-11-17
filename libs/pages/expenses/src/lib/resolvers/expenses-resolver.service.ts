import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, filter, take } from 'rxjs';
import { Expense, ExpensesStateFacade } from '@front-lucca-test/states/expenses-state';

@Injectable()
export class ExpensesResolver implements Resolve<Observable<Expense[]>> {
	constructor(private readonly store: ExpensesStateFacade) {}

	public resolve(): Observable<Expense[]> {
		this.store.init();

		return this.store.expenses$.pipe(
			filter((state) => state.length > 0),
			take(1),
		);
	}
}
