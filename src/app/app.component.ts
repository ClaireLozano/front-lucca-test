import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '@front-lucca-test/login';

@Component({
	standalone: true,
	imports: [RouterModule, LoginComponent],
	selector: 'front-lucca-test-root',
	template: '<front-lucca-test-login></front-lucca-test-login><router-outlet></router-outlet>',
})
export class AppComponent {}
