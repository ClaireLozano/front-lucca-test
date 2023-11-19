import { FormGroup } from '@angular/forms';
import { RequestEditExpense, RequestEditRestaurantExpense, RequestEditTripExpense } from '../models/edit-expense/edit-expense-request.interface';
import { RequestAddExpense, RequestAddRestaurantExpense, RequestAddTripExpense } from '../models/add-expense/add-expense-request.interface';

/**
 * Return the RequestEditExpense from a given form group
 */
export function getEditExpenseRequest(expenseId: number, form: FormGroup): RequestEditExpense {
	const { amount, comment, purchasedOn, nature, distance, invites } = form.getRawValue();

	const baseRequest = {
		id: expenseId,
		amount: parseFloat(amount),
		comment,
		purchasedOn,
		nature,
	};

	if (nature === 'restaurant') {
		const request: RequestEditRestaurantExpense = {
			...baseRequest,
			invites: parseInt(invites),
		};
		return request;
	}

	const request: RequestEditTripExpense = {
		...baseRequest,
		distance: parseInt(distance),
	};
	return request;
}

/**
 * Return the RequestAddExpense from a given form group
 */
export function getAddExpenseRequest(form: FormGroup): RequestAddExpense {
	const { amount, comment, purchasedOn, nature, distance, invites } = form.getRawValue();

	const baseRequest = {
		amount: parseFloat(amount),
		comment,
		purchasedOn,
		nature,
	};

	if (nature === 'restaurant') {
		const request: RequestAddRestaurantExpense = {
			...baseRequest,
			invites: parseInt(invites),
		};
		return request;
	}

	const request: RequestAddTripExpense = {
		...baseRequest,
		distance: parseInt(distance),
	};
	return request;
}
