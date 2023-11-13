import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'shared-button',
	standalone: true,
	imports: [CommonModule],
	template: `<p>button works!</p>`,
	styleUrls: ['./button.component.css'],
})
export class ButtonComponent {}
