import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expense, ExpensesStateFacade, getEditExpenseRequest, getAddExpenseRequest } from '@front-lucca-test/states/expenses-state';
import { Subscription } from 'rxjs';

// Todo : creer un fichier de constante pour y mettre tous les types de form control et les options du select
@Component({
	selector: 'exp-expense-form',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <h2>{{ title }}</h2>
		Champs obligatoires *<br /><br />

		<!-- Form -->
		<form [formGroup]="form" (ngSubmit)="onSubmit()">
			<nova-select-input
				[control]="natureControl"
				[label]="'Nature'"
				[isDisabled]="this.action === 'edit'"
				[name]="'nature'"
				[options]="options"
				[isRequired]="true"
			>
			</nova-select-input>
			<br /><br />
			<nova-input [control]="amountControl" [label]="'Amount'" [type]="'number'" [name]="'amount'" [isRequired]="true"></nova-input>
			<br /><br />
			<nova-textarea [control]="commentControl" [label]="'Comment'" [name]="'comment'" [isRequired]="true"> </nova-textarea>
			<br /><br />
			<nova-input [control]="purchasedOnControl" [label]="'PurchasedOn'" [type]="'date'" [name]="'purchasedOn'" [isRequired]="true">
			</nova-input>
			<br /><br />
			@if (natureValueSignal() === "trip") {
			<nova-input [control]="distanceControl" [label]="'Distance'" [type]="'number'" [name]="'distance'" [isRequired]="true"></nova-input>
			<br /><br />
			} @if (natureValueSignal() === "restaurant") {
			<nova-input [control]="invitesControl" [label]="'Invites'" [type]="'number'" [name]="'invites'" [isRequired]="true"></nova-input>
			<br /><br />
			}

			<!-- Error messages -->
			@if (errorFormSignal() === 'invalid') {
			<p>Formulaire invalide, veuillez saisir tous les champs obligatoires</p>
			} @if (errorFormSignal() === 'pristine') {
			<p>Aucune modification n'a été saisi</p>
			} @if (errorFormSignal() === 'apiError') {
			<p>Une erreur est survenu, veuillez réessayer plus tard</p>
			}

			<!-- Buttons -->
			<nova-button [label]="'Cancel'" (submitButtonEmitter)="onCancel()"></nova-button>
			<nova-button [label]="'Submit'" (submitButtonEmitter)="onSubmit()" [type]="'submit'"></nova-button><br />
		</form>`,
})
export class ExpenseFormComponent implements OnInit, OnDestroy {
	@Input()
	public expense?: Expense;

	@Input({ required: true })
	public title!: string;

	@Input({ required: true })
	public action!: 'edit' | 'add';

	@Output() public submitExpenseEmitter: EventEmitter<void> = new EventEmitter();
	@Output() public cancelExpenseEmitter: EventEmitter<void> = new EventEmitter();

	// Form
	// Todo : typer le formulaire, et pourquoi pas mettre le type dans un interface.ts
	public natureControl: FormControl = new FormControl('restaurant', Validators.required);
	// Todo : montant non null
	public amountControl: FormControl = new FormControl(0, Validators.required);
	public commentControl: FormControl = new FormControl('', Validators.required);
	public purchasedOnControl: FormControl = new FormControl('', Validators.required);
	public form: FormGroup = new FormGroup({
		nature: this.natureControl,
		amount: this.amountControl,
		comment: this.commentControl,
		purchasedOn: this.purchasedOnControl,
	});
	// Todo : voir pour rajouter des règles de gestion dans les inputs, un input de type number autorise certains char comme "E"
	public distanceControl: FormControl = new FormControl(0, Validators.required);
	public invitesControl: FormControl = new FormControl(0, Validators.required);
	public options: { value: string; label: string }[] = [
		{ value: 'restaurant', label: 'Restaurant' },
		{ value: 'trip', label: 'Trip' },
	];

	public natureValueSignal!: Signal<'trip' | 'restaurant'>;
	public errorFormSignal: Signal<'invalid' | 'pristine' | 'apiError' | undefined> = signal(undefined);

	// Todo : gérérer les erreurs apiError avec des signals ?

	private subscription: Subscription = new Subscription();

	constructor(private expensesFacade: ExpensesStateFacade) {}

	public ngOnInit(): void {
		this.initForm();
		this.fillForm();

		this.subscription.add(
			this.form.get('nature')?.valueChanges.subscribe((value) => {
				this.setSpecialControl(value);
			}),
		);
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	/**
	 * Init the form
	 */
	private initForm(): void {
		if (this.action === 'edit') {
			this.natureControl.disable();
		}
		this.setSpecialControl(this.expense?.nature || 'restaurant');
	}

	/**
	 * Set special control
	 * add "invities" control if the nature of the expense is "restaurant"
	 * add "distance" control if the nature of the expense is "trip"
	 */
	private setSpecialControl(nature: 'restaurant' | 'trip'): void {
		if (nature === 'restaurant') {
			this.form.removeControl('distance');
			this.form.addControl('invites', this.invitesControl);
			this.natureValueSignal = signal('restaurant');
			return;
		}

		this.form.removeControl('invites');
		this.form.addControl('distance', this.distanceControl);
		this.natureValueSignal = signal('trip');
	}

	/**
	 * On cancel, send event
	 */
	public onCancel(): void {
		this.cancelExpenseEmitter.emit();
	}

	/**
	 * On submit, verify if the form is valid and call expensesService
	 * Used for the edition of an expense or creation of new one
	 */
	public onSubmit(): void {
		this.errorFormSignal = signal(undefined);

		if (!this.form.valid) {
			this.errorFormSignal = signal('invalid');
			return;
		}

		if (this.form.pristine) {
			this.errorFormSignal = signal('pristine');
			return;
		}

		// Edit expense
		if (this.action === 'edit') {
			if (!this.expense?.id) {
				this.errorFormSignal = signal('invalid');
				return;
			}

			const request = getEditExpenseRequest(this.expense.id, this.form);
			this.expensesFacade.editExpense(request);

			return;
		}

		// Add new expense
		const request = getAddExpenseRequest(this.form);
		this.expensesFacade.addExpense(request);
	}

	/**
	 * Fill the form with the data of the expense to modify
	 */
	private fillForm(): void {
		if (!this.expense) {
			return;
		}

		this.form.get('nature')?.patchValue(this.expense.nature);
		this.form.get('amount')?.patchValue(this.expense.amount);
		this.form.get('comment')?.patchValue(this.expense.comment);
		this.form.get('purchasedOn')?.patchValue(this.expense.purchasedOn);
		if (this.expense?.nature === 'trip') {
			this.form.get('distance')?.patchValue(this.expense.distance);
			return;
		}
		this.form.get('invites')?.patchValue(this.expense?.invites);
	}
}
