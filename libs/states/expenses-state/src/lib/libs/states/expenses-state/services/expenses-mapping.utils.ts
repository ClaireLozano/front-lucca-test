import { FormGroup } from '@angular/forms';
import { RequestEditExpense } from '../models/edit-expense/edit-expense-request.interface';
import { RequestAddExpense } from '../models/add-expense/add-expense-request.interface';

/**
 * Return the RequestEditExpense from a given form group
 */
export function getEditExpenseRequest(expenseId: number, form: FormGroup): RequestEditExpense {
	if (form.value.nature === 'restaurant') {
		return {
			id: expenseId,
			amount: parseFloat(form.value.amount),
			comment: form.value.comment,
			purchasedOn: form.value.purchasedOn,
			nature: form.value.nature,
			invites: parseInt(form.value.invites),
		};
	}

	return {
		id: expenseId,
		amount: parseFloat(form.value.amount),
		comment: form.value.comment,
		purchasedOn: form.value.purchasedOn,
		nature: form.value.nature,
		distance: parseInt(form.value.distance),
	};
}

/**
 * Return the RequestAddExpense from a given form group
 */
export function getAddExpenseRequest(form: FormGroup): RequestAddExpense {
	if (form.value.nature === 'restaurant') {
		return {
			amount: parseFloat(form.value.amount),
			comment: form.value.comment,
			purchasedOn: form.value.purchasedOn,
			nature: form.value.nature,
			invites: parseInt(form.value.invites),
		};
	}

	return {
		amount: parseFloat(form.value.amount),
		comment: form.value.comment,
		purchasedOn: form.value.purchasedOn,
		nature: form.value.nature,
		distance: parseInt(form.value.distance),
	};
}
