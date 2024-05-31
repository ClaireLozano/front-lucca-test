import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '@front-lucca-test/login';
import { AuthStateFacade, AuthStateModule } from '@front-lucca-test/states/auth';

@Component({
	standalone: true,
	imports: [RouterModule, LoginComponent, AuthStateModule],
	selector: 'front-lucca-test-root',
	template: '<front-lucca-test-login></front-lucca-test-login><router-outlet></router-outlet>',
})
export class AppComponent {
	constructor(private authStateFacade: AuthStateFacade) {}

	ngOnInit(): void {
		this.authStateFacade.init();
	}
}
