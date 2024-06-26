import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense/expense.interface';
import { RequestAddTripExpense, RequestAddRestaurantExpense } from '../models/add-expense/add-expense-request.interface';
import { RequestEditTripExpense, RequestEditRestaurantExpense } from '../models/edit-expense/edit-expense-request.interface';

// Todo
const environment = {
	expenseApiUrl: 'http://localhost:3000',
} as const;

@Injectable()
export class ExpensesService {
	constructor(private http: HttpClient) {}

	/**
	 * Get all expenses
	 */
	public getExpenses(): Observable<Expense[]> {
		return this.http.get<Expense[]>(`${environment.expenseApiUrl}/expenses`);
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
	public addExpense(expense: RequestAddTripExpense | RequestAddRestaurantExpense): Observable<unknown> {
		return this.http.post<Expense>(`${environment.expenseApiUrl}/expenses`, expense);
	}

	/**
	 * Edit an expense
	 */
	public editExpense(expense: RequestEditTripExpense | RequestEditRestaurantExpense): Observable<unknown> {
		return this.http.put<Expense>(`${environment.expenseApiUrl}/expenses/${expense.id}`, expense);
	}
}
