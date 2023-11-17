import { Expense } from '../expense/expense.interface';

export interface ResponseGetExpenses {
	items: Expense[];
	count: number;
}
