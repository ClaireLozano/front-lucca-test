import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from './models/expense/expense.interface';

import { environment } from '@front-lucca-test/shared';
import { RequestAddTripExpenses, RequestAddRestaurantExpenses } from './models/add-expense/add-expense-request.interface';
import { RequestEditTripExpenses, RequestEditRestaurantExpenses } from './models/edit-expense/edit-expense-request.interface';
import { ResponseGetExpenses } from './models/get-expenses/get-expenses-response.interface';

@Injectable()
export class ExpensesService {
	constructor(private http: HttpClient) {}

	/**
	 * Get all expenses
	 */
	public getExpenses({ page, limit }: { page: number; limit: number }): Observable<ResponseGetExpenses> {
		const params = new HttpParams();
		params.append('page', page);
		params.append('limit', limit);

		return this.http.get<ResponseGetExpenses>(`${environment.expenseApiUrl}/expenses`);
	}

	/**
	 * Get an expense by id
	 */
	public getExpenseById(id: number): Observable<Expense> {
		return this.http.get<Expense>(`${environment.expenseApiUrl}/expenses/${id}`);
	}

	/**
	 * Add an expense
	 */
	public addExpense(expense: RequestAddTripExpenses | RequestAddRestaurantExpenses): Observable<unknown> {
		return this.http.post<Expense>(`${environment.expenseApiUrl}/expenses/`, expense);
	}

	/**
	 * Edit an expense
	 */
	public editExpense(expense: RequestEditTripExpenses | RequestEditRestaurantExpenses): Observable<unknown> {
		return this.http.put<Expense>(`${environment.expenseApiUrl}/expenses/${expense.id}`, expense);
	}
}
