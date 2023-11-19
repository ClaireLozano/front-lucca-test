import { ChangeDetectionStrategy, Component, Signal, signal } from '@angular/core';
import { Expense, ExpensesStateFacade } from '@front-lucca-test/states/expenses-state';

@Component({
	selector: 'exp-expenses-page',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<h1>Expenses page</h1>

		<!-- Add expense -->
		@if (statePageSignal() === 'add') {
		<exp-expense-form
			[action]="'add'"
			[title]="'Saisir une dépense'"
			(submitExpenseEmitter)="formSubmit()"
			(cancelExpenseEmitter)="cancelForm()"
		></exp-expense-form>
		}

		<!-- Add expense button -->
		@if (statePageSignal() === 'display' && expensesSignal()) {
		<nova-button [label]="'Saisir une nouvelle dépense'" (submitButtonEmitter)="onAddExpense()"> </nova-button>
		<br />
		<exp-expenses-list (editExpenseEmitter)="editExpense($event)"></exp-expenses-list>
		}

		<!-- Edit expense -->
		@if (statePageSignal() === 'edit') {
		<exp-expense-form
			[expense]="expenseToEditSignal()"
			[action]="'edit'"
			[title]="'Editer une dépense'"
			(submitExpenseEmitter)="formSubmit()"
			(cancelExpenseEmitter)="cancelForm()"
		></exp-expense-form>
		}
	`,
})
export class ExpensesPageComponent {
	// Get data from resolver
	public expensesSignal: Signal<Expense[]> = this.expensesFacade.expensesSignal;

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
		alert('Votre dépense à bien été saisie !');
	}

	/**
	 * Display add expense view
	 */
	public onAddExpense(): void {
		this.statePageSignal = signal('add');
	}
}
