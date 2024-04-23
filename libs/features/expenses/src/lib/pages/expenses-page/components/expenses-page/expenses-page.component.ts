import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from '@front-lucca-test/states/expenses-state';

@Component({
	selector: 'exp-expenses-page',
	templateUrl: './expenses-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesPageComponent {
	private router = inject(Router);

	/**
	 * Go to edit expense page
	 */
	public editExpense(expense: Expense): void {
		this.router.navigate(['/expenses/' + expense.id]);
	}
}
