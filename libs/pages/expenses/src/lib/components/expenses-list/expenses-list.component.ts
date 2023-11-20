import { ChangeDetectionStrategy, Component, EventEmitter, Output, Signal, computed } from '@angular/core';
import { Expense, ExpensesStateFacade } from '@front-lucca-test/states/expenses-state';

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
			@for (expense of expensesSignal()[actualPageNumberSignal()]; track expense.id) {
			<li>
				<exp-expense-display [expense]="expense" (clickedExpenseEmitter)="editExpense($event)"> </exp-expense-display>
			</li>
			}

			<!-- Pagination -->
			<div>
				<nova-button
					*ngFor="let key of numberOfPagesSignal()"
					[id]="'page-' + key"
					[label]="key.toString()"
					[pressed]="actualPageNumberSignal().toString() === key ? true : false"
					(click)="pageNumberClick(key.toString())"
				>
				</nova-button>
			</div>
		</ul>
	`,
})
export class ExpensesListComponent {
	public expensesSignal: Signal<{
		[key: number]: Expense[];
	}> = this.expensesFacade.expensesSignal;

	public countExpensesSignal: Signal<number | undefined> = this.expensesFacade.numberSignal;

	public actualPageNumberSignal: Signal<number> = this.expensesFacade.currentPageNumberSignal;

	public numberOfPagesSignal: Signal<string[]> = computed(() => {
		return Object.keys(this.expensesSignal());
	});

	@Output() public editExpenseEmitter: EventEmitter<Expense> = new EventEmitter();

	constructor(private expensesFacade: ExpensesStateFacade) {}

	/**
	 * Display edit expense view
	 */
	public editExpense(expense: Expense): void {
		this.editExpenseEmitter.emit(expense);
	}

	/**
	 * Change current page number
	 */
	public pageNumberClick(pageNumber: string): void {
		const parsedNumber: number = Number(pageNumber);

		if (isNaN(parsedNumber)) {
			console.error('Numéro de page invalide');
			return;
		}

		this.expensesFacade.setCurrentPageNumber(parsedNumber);
	}
}
