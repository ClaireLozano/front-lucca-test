import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'nova-textarea',
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
		<textarea [formControl]="control" [required]="isRequired" rows="4" cols="50" [class.error-input]="control.invalid && control.touched">
		</textarea>
	</label>`,
})
export class TextAreaComponent {
	@Input({ required: true })
	public name!: string;

	@Input({ required: true })
	public label!: string;

	@Input({ required: true })
	public control!: FormControl;

	@Input()
	public isRequired: boolean = false;
}
