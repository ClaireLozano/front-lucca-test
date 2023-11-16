import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, Signal, signal } from '@angular/core';
import { Expense } from '../../model/expense.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpensesService, RequestAddExpenses, RequestEditExpenses } from '../../services/expenses.service';
import { Subscription } from 'rxjs';

// Todo : commenter les fonctions pour dire à quoi elles servent, se qu'elles prennent en entré et en sortie
// Todo : creer un fichier de constante pour y mettre tous les types de form control et les options du select
@Component({
	selector: 'exp-expense-form',
	styleUrls: ['./expense-form.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <h2>{{ title }}</h2>
		Champs obligatoires *<br /><br />

		<!-- Form -->
		<form [formGroup]="form" (ngSubmit)="onSubmit()">
			<shared-select-input [formControl]="natureControl" [label]="'Nature'" [name]="'nature'" [options]="options" [required]="true"></shared-select-input><br /><br />
			<shared-input [formControl]="amountControl" [label]="'Amount'" [type]="'number'" [name]="'amount'" [required]="true"></shared-input><br /><br />
			<shared-textarea [formControl]="commentControl" [label]="'Comment'" [name]="'comment'" [required]="true"></shared-textarea><br /><br />
			<shared-input [formControl]="purchasedOnControl" [label]="'PurchasedOn'" [type]="'date'" [name]="'purchasedOn'" [required]="true"></shared-input><br /><br />
			@if (natureValueSignal() === "trip") {
			<shared-input [formControl]="distanceControl" [label]="'Distance'" [type]="'number'" [name]="'distance'" [required]="true"></shared-input><br /><br />
			} @if (natureValueSignal() === "restaurant") {
			<shared-input [formControl]="invitesControl" [label]="'Invites'" [type]="'number'" [name]="'invites'" [required]="true"></shared-input><br /><br />
			}

			<!-- Error message -->
			@if (errorFormSignal()) {
			<p>Veuillez saisir tous les champs obligatoires</p>
			}

			<!-- Buttons -->
			<shared-button [label]="'Cancel'" (onSubmitButton)="onCancel()"></shared-button><br />
			<shared-button [label]="'Submit'" [type]="'submit'"></shared-button><br />
		</form>`,
})
export class ExpenseFormComponent implements OnInit, OnDestroy {
	// Input
	@Input()
	public expense?: Expense;

	@Input({ required: true })
	public title!: string;

	@Input({ required: true })
	public action!: 'edit' | 'add';

	// Emmiter
	@Output() public submitExpenseEmitter: EventEmitter<void> = new EventEmitter();
	@Output() public editExpenseEmitter: EventEmitter<void> = new EventEmitter();

	// Form
	// Todo : typer le formulaire
	public natureControl: FormControl = new FormControl('', Validators.required);
	public amountControl: FormControl = new FormControl('', Validators.required);
	public commentControl: FormControl = new FormControl('', Validators.required);
	public purchasedOnControl: FormControl = new FormControl('', Validators.required);
	public form: FormGroup = new FormGroup({
		nature: this.natureControl,
		amount: this.amountControl,
		comment: this.commentControl,
		purchasedOn: this.purchasedOnControl,
	});
	public distanceControl: FormControl = new FormControl('', Validators.required);
	public invitesControl: FormControl = new FormControl('', Validators.required);
	public options: { value: string; label: string }[] = [
		{ value: 'restaurant', label: 'Restaurant' },
		{ value: 'trip', label: 'Trip' },
	];

	public natureValueSignal!: Signal<'trip' | 'restaurant'>;
	public errorFormSignal: Signal<boolean> = signal(false);

	private subscription: Subscription = new Subscription();

	constructor(private expensesService: ExpensesService, private cdr: ChangeDetectorRef) {}

	public ngOnInit(): void {
		this.initForm();
		this.fillForm();

		this.subscription.add(
			this.form.get('nature')?.valueChanges.subscribe((value) => {
				this.natureValueSignal = signal(value);

				if (this.form.value.nature === 'restaurant') {
					this.form.removeControl('distance');
					return;
				}
				this.form.removeControl('invites');
			}),
		);
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	public onCancel(): void {
		this.editExpenseEmitter.emit();
	}

	public onSubmit(): void {
		if (!this.form.valid) {
			this.errorFormSignal = signal(true);
		}

		this.errorFormSignal = signal(false);

		// Edit expense
		if (this.action === 'edit') {
			const request = this.getEditExpenseRequest();

			if (!request) {
				this.errorFormSignal = signal(true);
			}

			// Todo : J'ai pas toute la doc mais ça serait pas mal de gérer le cas ou l'api ne répond pas où si il y a d'autres erreurs
			this.subscription.add(
				this.expensesService.editExpense(request as RequestEditExpenses).subscribe(() => {
					this.submitExpenseEmitter.emit();
				}),
			);
			return;
		}

		// Add new expense
		const request = this.getAddExpenseRequest();

		this.subscription.add(
			this.expensesService.addExpense(request).subscribe(() => {
				this.submitExpenseEmitter.emit();
			}),
		);
	}

	private initForm(): void {
		if (this.expense?.nature === 'restaurant') {
			this.form.addControl('invites', this.invitesControl);
			this.natureValueSignal = signal('restaurant');
			return;
		}

		this.form.addControl('distance', this.distanceControl);
		this.natureValueSignal = signal('trip');
	}

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
		} else {
			this.form.get('invites')?.patchValue(this.expense?.invites);
		}
	}

	// Todo : Voir si c'est possible d'optimiser c'est 2 fonctions, pour le moment je suis bloqué par le typage et je n'ai pas beaucoup de temps devant moi ...
	private getEditExpenseRequest(): RequestEditExpenses | void {
		if (!this.expense) {
			return;
		}

		let request: RequestEditExpenses;

		const formData = this.form.value;

		if (formData.nature === 'restaurant') {
			request = {
				id: this.expense.id,
				amount: formData.amount,
				comment: formData.comment,
				purchasedOn: formData.purchasedOn,
				nature: formData.nature,
				invites: formData.invites,
			};
		} else {
			request = {
				id: this.expense.id,
				amount: formData.amount,
				comment: formData.comment,
				purchasedOn: formData.purchasedOn,
				nature: formData.nature,
				distance: formData.distance,
			};
		}

		return request;
	}

	private getAddExpenseRequest(): RequestAddExpenses {
		let request: RequestAddExpenses;

		const formData = this.form.value;

		if (formData.nature === 'restaurant') {
			request = {
				amount: formData.amount,
				comment: formData.comment,
				purchasedOn: formData.purchasedOn,
				nature: formData.nature,
				invites: formData.invites,
			};
		} else {
			request = {
				amount: formData.amount,
				comment: formData.comment,
				purchasedOn: formData.purchasedOn,
				nature: formData.nature,
				distance: formData.distance,
			};
		}

		return request;
	}
}
