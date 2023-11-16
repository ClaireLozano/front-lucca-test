import { ChangeDetectionStrategy, Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'shared-input',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FormsModule],
	styleUrls: ['./input.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<label>
		{{ label }}
		@if(required) {*}
		<br />
		<input formControlName="name" [type]="type" [required]="required" />
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
	public formControl!: FormControl;

	@Input()
	public required: boolean = false;
}
