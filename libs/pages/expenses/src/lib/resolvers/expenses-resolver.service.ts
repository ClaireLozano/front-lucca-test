import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ExpensesStateFacade } from '@front-lucca-test/states/expenses-state';
import { Observable, takeWhile } from 'rxjs';

@Injectable()
export class ExpensesResolver implements Resolve<string | undefined> {
	constructor(private readonly store: ExpensesStateFacade) {}

	public resolve(): Observable<string | undefined> {
		this.store.init();

		return this.store.getExpensesStatus$.pipe(takeWhile((status) => status !== 'success', true));
	}
}
