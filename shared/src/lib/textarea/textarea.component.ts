import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'shared-textarea',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, FormsModule],
	styleUrls: ['./textarea.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<label>
		{{ label }}
		@if(required) {*}
		<br />
		<textarea formControlName="comment" [required]="required" rows="4" cols="50"> </textarea>
	</label>`,
})
export class TextAreaComponent {
	@Input({ required: true })
	public name!: string;

	@Input({ required: true })
	public label!: string;

	@Input({ required: true })
	public formControl!: FormControl;

	@Input()
	public required: boolean = false;
}
