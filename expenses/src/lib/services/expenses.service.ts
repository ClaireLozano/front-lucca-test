import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../model/expense.interface';

import { environment } from '@front-lucca-test/shared';

export interface ResponseGetExpenses {
	items: Expense[];
	count: number;
}

export interface RequestAddTripExpenses {
	amount: string;
	comment: string;
	purchasedOn: string;
	nature: 'trip';
	distance: string;
}

export interface RequestAddRestaurantExpenses {
	amount: string;
	comment: string;
	purchasedOn: string;
	nature: 'restaurant';
	invites: number;
}

export type RequestAddExpenses =
	| RequestAddTripExpenses
	| RequestAddRestaurantExpenses;

export interface RequestEditTripExpenses {
	id: number;
	amount: string;
	comment: string;
	purchasedOn: string;
	nature: 'trip';
	distance: string;
}

export interface RequestEditRestaurantExpenses {
	id: number;
	amount: string;
	comment: string;
	purchasedOn: string;
	nature: 'restaurant';
	invites: number;
}

export type RequestEditExpenses =
	| RequestEditTripExpenses
	| RequestEditRestaurantExpenses;

@Injectable()
export class ExpensesService {
	constructor(private http: HttpClient) {}

	public getExpenses({
		page,
		limit,
	}: {
		page: number;
		limit: number;
	}): Observable<ResponseGetExpenses> {
		const params = new HttpParams();
		params.append('page', page);
		params.append('limit', limit);

		return this.http.get<ResponseGetExpenses>(
			`${environment.expenseApiUrl}/expenses`,
		);
	}

	public getExpenseById(id: number): Observable<Expense> {
		return this.http.get<Expense>(
			`${environment.expenseApiUrl}/expenses/${id}`,
		);
	}

	public addExpense(
		expense: RequestAddTripExpenses | RequestAddRestaurantExpenses,
	): Observable<unknown> {
		return this.http.post<Expense>(
			`${environment.expenseApiUrl}/expenses/`,
			expense,
		);
	}

	public editExpense(
		expense: RequestEditTripExpenses | RequestEditRestaurantExpenses,
	): Observable<unknown> {
		return this.http.put<Expense>(
			`${environment.expenseApiUrl}/expenses/${expense.id}`,
			expense,
		);
	}
}
