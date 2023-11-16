import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'shared-button',
	standalone: true,
	imports: [CommonModule],
	template: ` <button [attr.type]="type" (click)="onSubmitButton()" (touche)="onSubmitButton()">{{ label }}</button> `,
	styleUrls: ['./button.component.css'],
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
