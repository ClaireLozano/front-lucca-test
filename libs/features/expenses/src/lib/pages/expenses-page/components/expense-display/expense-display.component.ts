import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, Signal, signal } from '@angular/core';
import { Expense } from '@front-lucca-test/states/expenses-state';

@Component({
	selector: 'exp-expense-display',
	templateUrl: './expense-display.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseDisplayComponent implements OnInit {
	@Input({ required: true })
	public expense!: Expense;

	@Output()
	public clickedExpenseEmitter: EventEmitter<Expense> = new EventEmitter();

	public expenseToDisplaySignal!: Signal<{ key: string; value: string | number }[]>;

	public ngOnInit(): void {
		this.prepareExpenseValues();
	}

	/**
	 * Send event on click
	 */
	public clickedExpense(): void {
		this.clickedExpenseEmitter.emit(this.expense);
	}

	/**
	 * Map expense value for display
	 */
	private prepareExpenseValues(): void {
		if (!this.expense) {
			return;
		}

		this.expenseToDisplaySignal = signal(
			Object.keys(this.expense).map((key) => ({
				key,
				value: this.expense[key as keyof Expense],
			})),
		);
	}
}
