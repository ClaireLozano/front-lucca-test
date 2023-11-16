import { Expense } from './expense.interface';

export interface ResponseGetExpenses {
	items: Expense[];
	count: number;
}
