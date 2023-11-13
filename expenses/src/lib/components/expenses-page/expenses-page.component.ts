import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'exp-expenses-page',
	template: `<p>expenses page</p>`,
	styleUrls: ['./expenses-page.component.css'],
})
export class ExpensesPageComponent implements OnInit {
	public ngOnInit() {
		console.log('coucou');
	}
}

// resolver before display
