import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, Signal, signal } from '@angular/core';
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
			<shared-select-input
				[control]="natureControl"
				[label]="'Nature'"
				[isDisabled]="this.action === 'edit'"
				[name]="'nature'"
				[options]="options"
				[isRequired]="true"
			>
			</shared-select-input>
			<br /><br />
			<shared-input [control]="amountControl" [label]="'Amount'" [type]="'number'" [name]="'amount'" [isRequired]="true"></shared-input>
			<br /><br />
			<shared-textarea [control]="commentControl" [label]="'Comment'" [name]="'comment'" [isRequired]="true"> </shared-textarea>
			<br /><br />
			<shared-input [control]="purchasedOnControl" [label]="'PurchasedOn'" [type]="'date'" [name]="'purchasedOn'" [isRequired]="true">
			</shared-input>
			<br /><br />
			@if (natureValueSignal() === "trip") {
			<shared-input [control]="distanceControl" [label]="'Distance'" [type]="'number'" [name]="'distance'" [isRequired]="true"></shared-input>
			<br /><br />
			} @if (natureValueSignal() === "restaurant") {
			<shared-input [control]="invitesControl" [label]="'Invites'" [type]="'number'" [name]="'invites'" [isRequired]="true"></shared-input>
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
			<shared-button [label]="'Cancel'" (submitButtonEmitter)="onCancel()"></shared-button>
			<shared-button [label]="'Submit'" (submitButtonEmitter)="onSubmit()" [type]="'submit'"></shared-button><br />
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
	@Output() public cancelExpenseEmitter: EventEmitter<void> = new EventEmitter();

	// Form
	// Todo : typer le formulaire, et pourquoi pas mettre le type dans un interface.ts
	public natureControl: FormControl = new FormControl('restaurant', Validators.required);
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
	public errorFormSignal: Signal<'invalid' | 'pristine' | 'apiError' | undefined> = signal(undefined);

	private subscription: Subscription = new Subscription();

	constructor(private expensesService: ExpensesService) {}

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
		if (!this.form.valid) {
			this.errorFormSignal = signal('invalid');
		}

		if (this.form.pristine) {
			this.errorFormSignal = signal('pristine');
		}

		this.errorFormSignal = signal(undefined);

		// Edit expense
		if (this.action === 'edit') {
			const request = this.getEditExpenseRequest();

			if (!request) {
				this.errorFormSignal = signal('invalid');
			}

			this.subscription.add(
				this.expensesService.editExpense(request as RequestEditExpenses).subscribe(
					() => {
						this.submitExpenseEmitter.emit();
					},
					(error) => {
						console.log(error);
						this.errorFormSignal = signal('apiError');
					},
				),
			);
			return;
		}

		// Add new expense
		const request = this.getAddExpenseRequest();

		this.subscription.add(
			this.expensesService.addExpense(request).subscribe(
				() => {
					this.submitExpenseEmitter.emit();
				},
				(error) => {
					console.log(error);
					this.errorFormSignal = signal('apiError');
				},
			),
		);
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
		} else {
			this.form.get('invites')?.patchValue(this.expense?.invites);
		}
	}

	// Todo : Voir si c'est possible d'optimiser c'est 2 fonctions, pour le moment je suis bloqué par le typage
	// et je n'ai pas beaucoup de temps devant moi pour y consacrer plus de temps...
	// Ptet voir pour créer un utils.ts avec le service qui prendrait en entré un formgroup et qui renvoie la requete
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
