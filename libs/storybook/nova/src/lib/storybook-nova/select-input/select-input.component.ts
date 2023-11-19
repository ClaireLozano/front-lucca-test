import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'nova-select-input',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	styles: [
		`
			.error-input {
				border: 1px solid red;
			}
		`,
	],
	template: `<label>
		{{ label }}

		@if(isRequired) {*}
		<br />
		<select
			[formControl]="control"
			rows="4"
			cols="50"
			[disabled]="isDisabled"
			[required]="isRequired"
			[class.error-input]="control.invalid && control.touched"
		>
			<option *ngFor="let option of options" [value]="option.value">
				{{ option.label }}
			</option>
		</select>
	</label>`,
})
export class SelectInputComponent {
	@Input({ required: true })
	public name!: string;

	@Input({ required: true })
	public label!: string;

	@Input({ required: true })
	public options!: { value: string; label: string }[];

	@Input({ required: true })
	public control!: FormControl;

	@Input()
	public isRequired: boolean = false;

	@Input()
	public isDisabled: boolean = false;
}
