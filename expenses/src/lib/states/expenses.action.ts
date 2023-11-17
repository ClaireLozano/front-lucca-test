import { Inject, Injectable } from '@angular/core';

@Injectable()
export class GetExpensesAction {
	static readonly type = '[Expenses] Get Expenses';
	constructor(@Inject('sortToken') public sort: { page: number; limit: number }) {}
}
