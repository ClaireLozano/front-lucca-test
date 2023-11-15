import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	standalone: true,
	imports: [RouterModule],
	selector: 'front-lucca-test-root',
	template: '<router-outlet></router-outlet>',
})
export class AppComponent {}
