import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import {
	ExpensesService,
	ResponseGetExpenses,
} from '../services/expenses.service';

@Injectable()
export class ExpensesPageResolver
	implements Resolve<Observable<ResponseGetExpenses>>
{
	constructor(private expensesService: ExpensesService) {}

	resolve(): Observable<ResponseGetExpenses> {
		return this.expensesService.getExpenses({ page: 5, limit: 10 });
	}
}
