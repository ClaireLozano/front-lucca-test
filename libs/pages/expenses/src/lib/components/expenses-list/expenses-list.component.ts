import { ChangeDetectionStrategy, Component, EventEmitter, Output, Signal } from '@angular/core';
import { Expense, ExpensesStateFacade } from '@front-lucca-test/states/expenses-state';

// Todo : faire un affichage un peu plus sympa pour l'affichage des différentes dépenses
@Component({
	selector: 'exp-expenses-list',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<!-- Number expenses -->
		<h2>Nombre de dépenses :</h2>
		<p>{{ countExpensesSignal() || '0' }}</p>

		<!-- Display expenses -->
		<h2>Liste des dépenses :</h2>
		<ul>
			@for (expense of expensesSignal(); track expense.id) {
			<li>
				<exp-expense-display [expense]="expense" (clickedExpenseEmitter)="editExpense($event)"> </exp-expense-display>
			</li>
			}
		</ul>
	`,
})
export class ExpensesListComponent {
	// Get data from resolver
	public expensesSignal: Signal<Expense[]> = this.expensesFacade.expensesSignal;
	public countExpensesSignal: Signal<number | undefined> = this.expensesFacade.numberSignal;

	@Output() public editExpenseEmitter: EventEmitter<Expense> = new EventEmitter();

	constructor(private expensesFacade: ExpensesStateFacade) {}

	/**
	 * Display edit expense view
	 */
	public editExpense(expense: Expense): void {
		this.editExpenseEmitter.emit(expense);
	}
}
