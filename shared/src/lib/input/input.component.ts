import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'shared-input',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
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
		<input [formControl]="control" [type]="type" [required]="isRequired" [class.error-input]="control.invalid && control.touched" />
	</label>`,
})
export class InputComponent {
	@Input()
	public type: 'text' | 'number' | 'date' = 'text';

	@Input({ required: true })
	public name!: string;

	@Input({ required: true })
	public label!: string;

	@Input({ required: true })
	public control!: FormControl;

	@Input()
	public isRequired: boolean = false;
}
