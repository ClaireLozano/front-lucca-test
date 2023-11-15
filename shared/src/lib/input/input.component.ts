import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'shared-input',
	standalone: true,
	imports: [CommonModule],
	styleUrls: ['./input.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <input [attr.type]="type" [attr.formControlName]="name" /> `,
})
export class InputComponent {
	// Input
	@Input()
	public type: 'text' | 'number' | 'date' = 'text';
	@Input({ required: true })
	public name!: string;
}
