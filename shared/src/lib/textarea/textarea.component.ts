import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'shared-textarea',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	styleUrls: ['./textarea.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<label>
		{{ label }}
		@if(isRequired) {*}
		<br />
		<textarea [formControl]="control" [required]="isRequired" rows="4" cols="50"> </textarea>
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
