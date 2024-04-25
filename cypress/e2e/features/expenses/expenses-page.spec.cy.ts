import { getH2, goToHomePage } from 'cypress/support/app.po';

describe('Expenses page', () => {
	beforeEach(() => goToHomePage());

	it('should be redirected to /expenses', () => {
		cy.location().should((location) => {
			expect(location.pathname).to.eq('/expenses');
		});
	});

	describe('Expenses list', () => {
		it('should display list title', () => {
			getH2().contains(/Liste des dépenses/);
		});

		it('should display pagination and switch page', () => {
			/* ==== Generated with Cypress Studio ==== */
			cy.get('#page-5 > button > p').click();
			cy.get('#page-13 > button > p').click();
			cy.get(':nth-child(1) > exp-expense-display > div > :nth-child(1)').should('be.visible');
			cy.get(':nth-child(1) > exp-expense-display > div > :nth-child(4)').should('be.visible');
			/* ==== End Cypress Studio ==== */
		});
	});

	describe('Expenses number', () => {
		it('should display number title', () => {
			getH2().contains(/Nombre de dépenses/);
		});

		it('should display number', () => {
			/* ==== Generated with Cypress Studio ==== */
			cy.get('exp-expenses-list > :nth-child(2)').should('be.visible');
			/* ==== End Cypress Studio ==== */
		});
	});
});
