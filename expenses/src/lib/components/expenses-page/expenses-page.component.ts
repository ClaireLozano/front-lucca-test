import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Expense } from '../../model/expense.interface';

@Component({
	selector: 'exp-expenses-page',
	styleUrls: ['./expenses-page.component.css'],
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
		<shared-button [label]="'Saisir une nouvelle dépense'" (submitButtonEmitter)="onAddExpense()"> </shared-button>
		<br />

		<!-- Number expenses -->
		<h2>Nombre de dépenses :</h2>
		<p>{{ numberExpensesSignal() || '0' }}</p>

		<!-- Display expenses -->
		<h2>Liste des dépenses :</h2>
		<ul>
			@for (expense of expensesSignal(); track expense.id) {
			<li>
				<exp-expense-display [expense]="expense" (editExpenseEmitter)="editExpense($event)"> </exp-expense-display>
			</li>
			}
		</ul>
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
export class ExpensesPageComponent implements OnInit {
	public expensesSignal!: Signal<Expense[]>;
	public numberExpensesSignal!: Signal<number>;
	public statePageSignal: Signal<'display' | 'edit' | 'add'> = signal('display');
	public expenseToEditSignal!: Signal<Expense>;

	constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

	public ngOnInit(): void {
		this.numberExpensesSignal = signal(this.route.snapshot.data['expenses'].count);
		this.expensesSignal = signal(this.route.snapshot.data['expenses'].items as Expense[]);
	}

	public editExpense(expense: Expense): void {
		this.expenseToEditSignal = signal(expense);
		this.statePageSignal = signal('edit');
	}

	public cancelForm(): void {
		this.statePageSignal = signal('display');
	}

	public formSubmit(): void {
		this.statePageSignal = signal('display');
		alert('Votre dépense à bien été saisie !');
	}

	public onAddExpense(): void {
		this.statePageSignal = signal('add');
		this.cdr.markForCheck();
	}
}
