import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from './models/expense.interface';

import { environment } from '@front-lucca-test/shared';
import { ResponseGetExpenses } from './models/responses.interface';
import {
	RequestAddRestaurantExpenses,
	RequestAddTripExpenses,
	RequestEditRestaurantExpenses,
	RequestEditTripExpenses,
} from './models/requests.interface';

@Injectable()
export class ExpensesService {
	constructor(private http: HttpClient) {}

	public getExpenses({ page, limit }: { page: number; limit: number }): Observable<ResponseGetExpenses> {
		const params = new HttpParams();
		params.append('page', page);
		params.append('limit', limit);

		return this.http.get<ResponseGetExpenses>(`${environment.expenseApiUrl}/expenses`);
	}

	public getExpenseById(id: number): Observable<Expense> {
		return this.http.get<Expense>(`${environment.expenseApiUrl}/expenses/${id}`);
	}

	public addExpense(expense: RequestAddTripExpenses | RequestAddRestaurantExpenses): Observable<unknown> {
		return this.http.post<Expense>(`${environment.expenseApiUrl}/expenses/`, expense);
	}

	public editExpense(expense: RequestEditTripExpenses | RequestEditRestaurantExpenses): Observable<unknown> {
		return this.http.put<Expense>(`${environment.expenseApiUrl}/expenses/${expense.id}`, expense);
	}
}
