import { ChangeDetectionStrategy, Component, EventEmitter, Output, Signal, computed, inject } from '@angular/core';
import { Expense, ExpensesStateFacade } from '@front-lucca-test/states/expenses-state';

@Component({
	selector: 'exp-expenses-list',
	templateUrl: './expenses-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesListComponent {
	private expensesFacade = inject(ExpensesStateFacade);

	@Output() public editExpenseEmitter: EventEmitter<Expense> = new EventEmitter();

	public expensesSignal: Signal<{
		[key: number]: Expense[];
	}> = this.expensesFacade.expensesSignal;

	public countExpensesSignal: Signal<number | undefined> = this.expensesFacade.numberSignal;

	public actualPageNumberSignal: Signal<number> = this.expensesFacade.currentPageNumberSignal;

	public numberOfPagesSignal: Signal<string[]> = computed(() => {
		return Object.keys(this.expensesSignal());
	});

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
