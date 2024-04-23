import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ExpensesStateFacade } from '@front-lucca-test/states/expenses-state';
import { Observable, takeWhile } from 'rxjs';

@Injectable()
export class ExpenseResolver implements Resolve<string | undefined> {
	constructor(private readonly store: ExpensesStateFacade) {}

	public resolve(route: ActivatedRouteSnapshot): Observable<string | undefined> {
		this.store.initGetExpenseById();

		const id = route.paramMap.get('id') || '';
		this.store.getExpenseById(parseInt(id));

		return this.store.getExpenseStatus$.pipe(takeWhile((status) => status !== 'success', true));
	}
}
