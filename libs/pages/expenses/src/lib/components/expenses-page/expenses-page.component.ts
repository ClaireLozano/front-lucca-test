import { ChangeDetectionStrategy, Component, Signal, signal } from '@angular/core';
import { Expense, ExpensesStateFacade } from '@front-lucca-test/states/expenses-state';

@Component({
	selector: 'exp-expenses-page',
	templateUrl: './expenses-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesPageComponent {
	// Get data from resolver
	public expensesSignal: Signal<{
		[key: number]: Expense[];
	}> = this.expensesFacade.expensesSignal;

	// State of page view
	public statePageSignal: Signal<'display' | 'edit' | 'add'> = signal('display');

	public expenseToEditSignal!: Signal<Expense>;

	constructor(private expensesFacade: ExpensesStateFacade) {}

	/**
	 * Display edit expense view
	 */
	public editExpense(expense: Expense): void {
		this.expenseToEditSignal = signal(expense);
		this.statePageSignal = signal('edit');
	}

	/**
	 * Display list expenses view on cancel form
	 */
	public cancelForm(): void {
		this.statePageSignal = signal('display');
	}

	/**
	 * On form submit
	 */
	public formSubmit(): void {
		this.expensesFacade.init();

		this.statePageSignal = signal('display');
		alert('Votre dépense a bien été saisie !');
	}

	/**
	 * Display add expense view
	 */
	public onAddExpense(): void {
		this.statePageSignal = signal('add');
	}
}
