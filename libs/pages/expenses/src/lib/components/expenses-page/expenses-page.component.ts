import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Signal, signal } from '@angular/core';
import { Expense } from '../../services/models/expense/expense.interface';
import { Observable } from 'rxjs';

// Todo : faire plutot 3 vrai page avec navigation SPA
// Si on edit pas ou modifie pas, on met pas a jour le state

// Todo : faire un affichage un peu plus sympa pour l'affichage des différentes dépenses

// Todo : les TU
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
		@if (statePageSignal() === 'display' && (expenses$ | async)) {
		<nova-button [label]="'Saisir une nouvelle dépense'" (submitButtonEmitter)="onAddExpense()"> </nova-button>
		<br />

		<!-- Number expenses -->
		<h2>Nombre de dépenses :</h2>
		<p>{{ (countExpenses$ | async) || '0' }}</p>

		<!-- Display expenses -->
		<!-- Si jamais le composant devient trop gros, le mettre dans un autre composant 'expenses-list' -->
		<h2>Liste des dépenses :</h2>
		<ul>
			@for (expense of (expenses$ | async); track expense.id) {
			<li>
				<exp-expense-display [expense]="expense" (clickedExpenseEmitter)="editExpense($event)"> </exp-expense-display>
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
export class ExpensesPageComponent {
	// Get data from resolver
	@Select(ExpensesState.getExpenses) expenses$!: Observable<Expense[]>;
	@Select(ExpensesState.getNumberExpenses) countExpenses$!: Observable<number>;

	// State of page view
	public statePageSignal: Signal<'display' | 'edit' | 'add'> = signal('display');

	public expenseToEditSignal!: Signal<Expense>;

	constructor(private cdr: ChangeDetectorRef, private store: Store) {}

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
		this.store.dispatch(new GetExpensesAction({ page: 2, limit: 5 }));

		this.statePageSignal = signal('display');
		alert('Votre dépense à bien été saisie !');
	}

	/**
	 * Display add expense view
	 */
	public onAddExpense(): void {
		this.statePageSignal = signal('add');
		this.cdr.markForCheck();
	}
}