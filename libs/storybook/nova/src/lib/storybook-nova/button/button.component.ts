import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'nova-button',
	standalone: true,
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: ` <button [attr.type]="type" (click)="onSubmitButton()">{{ label }}</button> `,
})
export class ButtonComponent {
	@Input({ required: true })
	public label!: string;

	@Input()
	public type: 'button' | 'submit' = 'button';

	@Output()
	public submitButtonEmitter: EventEmitter<void> = new EventEmitter();

	public onSubmitButton() {
		this.submitButtonEmitter.emit();
	}
}
