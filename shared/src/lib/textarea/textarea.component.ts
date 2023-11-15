import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'shared-textarea',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.css'],
})
export class TextareaComponent {}
