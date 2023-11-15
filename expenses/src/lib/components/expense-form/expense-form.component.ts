import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Expense } from '../../model/expense.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'exp-expense-form',
	styleUrls: ['./expense-form.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <form [formGroup]="form" (ngSubmit)="onSubmit()">
		<label>
			Nature:
			<shared-input [type]="select" [name]="nature" ></shared-input>
		</label>
		<br />
		<label>
			Amount:
			<shared-input [type]="'number'" [name]="'amount'" /></shared-input>
		</label>
		<br />
		<label>
			Comment:
			<shared-input [type]="'number'" [name]="'comment'" /></shared-input>
		</label>
		<br />
		<label>
			PurchasedOn:
			<shared-input [type]="'date'" [name]="'purchasedOn'" /></shared-input>
		</label>
		<br />
		<label>
			Distance:
			<shared-input [type]="'number'" [name]="'distance'" /></shared-input>
		</label>
		<br />
		<label>
			Invites:
			<shared-input [type]="'number'" [name]="'invites'" /></shared-input>
		</label>
		<br />
		<br />
		<shared-button [label]="'Cancel'" (onClick)="onCancel()"></shared-button>
		<shared-button [type]="'submit'" [label]="'Submit'"></shared-button>
	</form>`,
})
export class ExpenseFormComponent implements OnInit {
	// Input
	@Input({ required: true })
	public expense!: Expense;

	// Emmiter
	@Output() public submitExpenseEmitter: EventEmitter<void> = new EventEmitter();
	@Output() public editExpenseEmitter: EventEmitter<void> = new EventEmitter();

	// Form
	public form: FormGroup = new FormGroup({
		nature: new FormControl('', Validators.required),
		amount: new FormControl('', Validators.required),
		comment: new FormControl('', Validators.required),
		purchasedOn: new FormControl('', Validators.required),
	});
	public distanceControl: FormControl = new FormControl('', Validators.required);
	public invitesControl: FormControl = new FormControl('', Validators.required);

	constructor() {}

	public ngOnInit(): void {
		this.initForm();
	}

	public onCancel(): void {
		this.editExpenseEmitter.emit();
	}

	public onSubmit(): void {
		// call edit
		this.submitExpenseEmitter.emit();
	}

	private initForm(): void {
		if (this.expense.nature === 'restaurant') {
			this.form.addControl('distance', this.distanceControl);
		} else {
			this.form.addControl('invites', this.invitesControl);
		}
	}
}
