import { Injectable, inject } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { ExpensesService, ExpensesStateFacade, ResponseGetExpenses } from '@front-lucca-test/states/expenses-state';
import { EMPTY, Observable, catchError, map, of } from 'rxjs';

@Injectable()
export class ExpensesResolver implements Resolve<ResponseGetExpenses | null> {
	private router = inject(Router);
	private store = inject(ExpensesStateFacade);
	private service = inject(ExpensesService);

	public resolve(): Observable<ResponseGetExpenses | null> {
		const expenses = this.store.expensesSignal();

		if (expenses && Object.keys(expenses).length > 0) {
			return of(null);
		}

		this.store.init();

		return this.service.getExpenses({ page: 5, limit: 10 }).pipe(
			map((result: ResponseGetExpenses) => {
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
