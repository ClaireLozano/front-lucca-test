import { FormGroup } from '@angular/forms';
import { RequestEditExpenses } from './models/edit-expense/edit-expense-request.interface';
import { RequestAddExpenses } from './models/add-expense/add-expense-request.interface';

/**
 * Return the RequestEditExpenses from a given form group
 */
export function getEditExpenseRequest(expenseId: number, form: FormGroup): RequestEditExpenses {
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
 * Return the RequestAddExpenses from a given form group
 */
export function getAddExpenseRequest(form: FormGroup): RequestAddExpenses {
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
