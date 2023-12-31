import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	Signal,
	effect,
	signal,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expense, ExpensesStateFacade, getEditExpenseRequest, getAddExpenseRequest } from '@front-lucca-test/states/expenses-state';
import { Subscription } from 'rxjs';

@Component({
	selector: 'exp-expense-form',
	templateUrl: './expense-form.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
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
	public natureControl: FormControl = new FormControl('restaurant', Validators.required);
	public amountControl: FormControl = new FormControl('', [Validators.required, Validators.min(0.01)]);
	public commentControl: FormControl = new FormControl('', Validators.required);
	public purchasedOnControl: FormControl = new FormControl('', Validators.required);
	public form: FormGroup = new FormGroup({
		nature: this.natureControl,
		amount: this.amountControl,
		comment: this.commentControl,
		purchasedOn: this.purchasedOnControl,
	});
	public distanceControl: FormControl = new FormControl('', [Validators.required, Validators.min(0)]);
	public invitesControl: FormControl = new FormControl('', Validators.required);
	public options: { value: string; label: string }[] = [
		{ value: 'restaurant', label: 'Restaurant' },
		{ value: 'trip', label: 'Trip' },
	];

	public natureValueSignal!: Signal<'trip' | 'restaurant'>;
	public errorFormSignal: Signal<'invalid' | 'pristine' | 'apiError' | undefined> = signal(undefined);

	private subscription: Subscription = new Subscription();

	constructor(private cdr: ChangeDetectorRef, private expensesFacade: ExpensesStateFacade) {
		this.expensesFacade.initAddExpense();
		this.expensesFacade.initEditExpense();

		effect(() => {
			if (this.expensesFacade.editExpenseStatusSignal() === 'error' || this.expensesFacade.addExpenseStatusSignal() === 'error') {
				this.errorFormSignal = signal('apiError');
			}
			if (this.expensesFacade.editExpenseStatusSignal() === 'success' || this.expensesFacade.addExpenseStatusSignal() === 'success') {
				this.submitExpenseEmitter.emit();
			}
		});
	}

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
		this.form.markAllAsTouched();
		this.cdr.detectChanges;

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
