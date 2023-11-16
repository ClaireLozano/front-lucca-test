import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'shared-select-input',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FormsModule],
	styleUrls: ['./select-input.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<label>
		{{ label }}
		@if(required) {*}
		<br />
		<select formControlName="name" rows="4" cols="50" [required]="required">
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
	public formControl!: FormControl;

	@Input()
	public required: boolean = false;
}
