import { ChangeDetectionStrategy, Component, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Expense } from '../../model/expense.interface';

@Component({
	selector: 'exp-expenses-page',
	styleUrls: ['./expenses-page.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<h1>Expenses page</h1>

		@if (expensesSignal()) {
		<h2>Nombre de dépenses :</h2>
		<p>{{ numberExpensesSignal() || '0' }}</p>

		<!-- Display expenses -->
		<h2>Liste des dépenses :</h2>
		@if (statePageSignal() === 'display') {
		<ul>
			@for (expense of expensesSignal(); track expense.id) {
			<li><exp-expense-display [expense]="expense" (editExpenseEmitter)="editExpense($event)"></exp-expense-display></li>
			}
		</ul>
		}

		<!-- Edit expense -->
		@if (statePageSignal() === 'display') {
		<exp-expense-form [expense]="expenseToEditSignal()" (formSubmitEmitter)="formSubmit()"></exp-expense-form>
		} }
	`,
})
export class ExpensesPageComponent implements OnInit {
	public expensesSignal!: Signal<Expense[]>;
	public numberExpensesSignal!: Signal<number>;
	public statePageSignal: Signal<'display' | 'edit'> = signal('display');
	public expenseToEditSignal!: Signal<Expense>;

	constructor(private route: ActivatedRoute) {}

	public ngOnInit(): void {
		this.numberExpensesSignal = signal(this.route.snapshot.data['expenses'].count);
		this.expensesSignal = signal(this.route.snapshot.data['expenses'].items as Expense[]);
	}

	public editExpense(expense: Expense): void {
		this.statePageSignal = signal('edit');
		this.expenseToEditSignal = signal(expense);
	}

	public formSubmit(): void {
		this.statePageSignal = signal('display');
		alert('Dépense modifié !');
	}
}
