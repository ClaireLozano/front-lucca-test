import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Expense, ExpensesService, ExpensesStateFacade } from '@front-lucca-test/states/expenses-state';
import { EMPTY, Observable, catchError, map } from 'rxjs';

@Injectable()
export class ExpenseResolver implements Resolve<Expense> {
	private service = inject(ExpensesService);
	private router = inject(Router);
	private store = inject(ExpensesStateFacade);

	public resolve(route: ActivatedRouteSnapshot): Observable<Expense> {
		const id = route.paramMap.get('id') || '';

		return this.service.getExpenseById(parseInt(id)).pipe(
			map((result: Expense) => {
				this.store.loadExpenseByIdStateSuccess(result);
				return result;
			}),
			catchError(() => {
				this.router.navigate(['expenses/error']);
				return EMPTY;
			}),
		);
	}
}
