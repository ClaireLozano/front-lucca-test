import { Injectable } from '@angular/core';
import { Action, State, StateContext, Selector } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { GetExpensesAction } from './expenses.action';
import { ExpensesService } from '../services/expenses.service';
import { ResponseGetExpenses } from '../services/models/get-expenses/get-expenses-response.interface';
import { Expense } from '../services/models/expense/expense.interface';

export interface ExpenseStateModel {
	items: Expense[];
	count: number;
}

@State({
	name: 'expenses',
	defaults: {
		items: [],
		count: 0,
	},
})
@Injectable()
export class ExpensesState {
	constructor(private expensesService: ExpensesService) {}

	@Selector()
	static getExpenses(state: ExpenseStateModel): Expense[] {
		return state.items;
	}

	@Selector()
	static getNumberExpenses(state: ExpenseStateModel): number {
		return state.count;
	}

	@Action(GetExpensesAction)
	public getExpensesAction(context: StateContext<ExpenseStateModel>, action: GetExpensesAction): Observable<ResponseGetExpenses> {
		return this.expensesService.getExpenses(action.sort).pipe(
			tap((expenses: ResponseGetExpenses) => {
				context.patchState({
					items: expenses.items,
					count: expenses.count,
				});
			}),
		);
	}
}
