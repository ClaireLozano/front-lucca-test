import { getGreeting } from '../support/app.po';

describe('front-lucca-test', () => {
	beforeEach(() => cy.visit('/'));

	it('should display page title', () => {
		getGreeting().contains(/Expenses/);
	});
});
