import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, Signal, signal } from '@angular/core';
import { Expense } from '../../model/expense.interface';

@Component({
	selector: 'exp-expense-display',
	styleUrls: ['./expense-display.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div *ngIf="this.expense">
			@for (attribute of expenseToDisplaySignal(); track $index) {
			<p>{{ attribute.key }}: {{ attribute.value }}</p>
			}
			<shared-button [label]="'Edit'" (onClickEmitter)="editExpense()"></shared-button>
		</div>
	`,
})
export class ExpenseDisplayComponent implements OnInit {
	@Input({ required: true })
	public expense!: Expense;

	@Output() public editExpenseEmitter: EventEmitter<Expense> = new EventEmitter();

	public expenseToDisplaySignal!: Signal<{ key: string; value: string | number }[]>;

	public ngOnInit(): void {
		this.prepareExpenseValues();
	}

	public editExpense(): void {
		this.editExpenseEmitter.emit(this.expense);
	}

	private prepareExpenseValues(): void {
		if (this.expense) {
			this.expenseToDisplaySignal = signal(
				Object.keys(this.expense).map((key) => ({
					key,
					value: this.expense[key as keyof Expense],
				})),
			);
		}
	}
}
