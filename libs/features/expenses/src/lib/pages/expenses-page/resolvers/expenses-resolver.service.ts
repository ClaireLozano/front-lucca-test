import { Injectable, inject } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Expense, ExpensesService, ExpensesStateFacade } from '@front-lucca-test/states/expenses-state';
import { EMPTY, Observable, catchError, map, of } from 'rxjs';

@Injectable()
export class ExpensesResolver implements Resolve<Expense[] | null> {
	private router = inject(Router);
	private store = inject(ExpensesStateFacade);
	private service = inject(ExpensesService);

	public resolve(): Observable<Expense[] | null> {
		const expenses = this.store.expensesSignal();

		if (expenses && Object.keys(expenses).length > 0) {
			return of(null);
		}

		this.store.init();

		return this.service.getExpenses().pipe(
			map((result: Expense[]) => {
				this.store.setExpenses(result);
				return result;
			}),
			catchError(() => {
				this.router.navigate(['expenses/error']);
				return EMPTY;
			}),
		);
	}
}
