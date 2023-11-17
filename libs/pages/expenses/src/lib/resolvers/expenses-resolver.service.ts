import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, filter, take, tap } from 'rxjs';

@Injectable()
export class ExpensesResolver implements Resolve<Observable<ExpenseStateModel>> {
	constructor(private store: Store) {}

	public resolve() {
		this.store.dispatch(new GetExpensesAction({ page: 2, limit: 5 }));

		return this.store
			.select((state) => state.expenses)
			.pipe(
				filter((state) => state.items.length > 0), // Filtrer jusqu'à ce que les données soient disponibles
				take(1), // Prendre seulement une fois
				tap((state) => console.log('Dépenses récupérées:', state)),
			);
	}
}
