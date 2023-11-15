import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'shared-select-input',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './select-input.component.html',
	styleUrls: ['./select-input.component.css'],
})
export class SelectInputComponent {}
