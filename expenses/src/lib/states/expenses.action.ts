export class GetExpensesAction {
	static readonly type = '[Expenses] Get Expenses';
	constructor(public sort: { page: number; limit: number }) {}
}
