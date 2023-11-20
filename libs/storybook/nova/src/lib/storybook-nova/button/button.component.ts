import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'nova-button',
	standalone: true,
	imports: [CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		`
			.pressed-button {
				font-size: 18px;
			}
		`,
	],
	template: `
		<button [attr.type]="type" [attr.aria-pressed]="pressed" (click)="onSubmitButton()">
			<p [class.pressed-button]="pressed">{{ label }}</p>
		</button>
	`,
})
export class ButtonComponent {
	@Input({ required: true })
	public label!: string;

	@Input()
	public type: 'button' | 'submit' = 'button';

	@Input()
	public pressed: boolean = false;

	@Output()
	public submitButtonEmitter: EventEmitter<void> = new EventEmitter();

	public onSubmitButton() {
		this.submitButtonEmitter.emit();
	}
}
