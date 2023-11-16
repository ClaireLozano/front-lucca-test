import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, filter, take, tap } from 'rxjs';
import { Store } from '@ngxs/store';
import { GetExpensesAction } from '../states/expenses.action';
import { ExpenseStateModel } from '../states/expenses.state';

@Injectable()
export class ExpensesPageResolver implements Resolve<Observable<ExpenseStateModel>> {
	constructor(private store: Store) {}

	public resolve() {
		this.store.dispatch(new GetExpensesAction({ page: 2, limit: 5 }));

		return this.store.dispatch(new GetExpensesAction({ page: 2, limit: 5 })).pipe(
			filter((state) => state.items.length > 0), // Filtrer jusqu'à ce que les données soient disponibles
			take(1), // Prendre seulement une fois
			tap((state) => console.log('Dépenses récupérées:', state)),
		);
	}
}
