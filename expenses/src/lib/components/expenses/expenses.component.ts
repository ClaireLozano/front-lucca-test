import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'exp-expenses',
	standalone: true,
	imports: [CommonModule],
	template: `<p>expenses page</p>`,
	styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent {}

// resolver before display
