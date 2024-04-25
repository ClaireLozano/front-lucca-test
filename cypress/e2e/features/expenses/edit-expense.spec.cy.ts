import { getH2, goToHomePage } from 'cypress/support/app.po';

describe('Edit expense page', () => {
	beforeEach(() => goToHomePage());

	it('should display form', () => {
		/* ==== Generated with Cypress Studio ==== */
		cy.get(':nth-child(1) > exp-expense-display > div > :nth-child(2)').click();
		cy.get('h2').should('have.text', 'Editer une dépense');
		cy.get('nova-select-input > label > .ng-untouched').should('be.disabled');
		cy.get('[ng-reflect-label="Amount (doit être superieur à "] > label > .ng-pristine').should('be.enabled');
		cy.get('nova-textarea > label > .ng-pristine').should('be.enabled');
		cy.get('[ng-reflect-label="PurchasedOn"] > label > .ng-pristine').should('be.enabled');
		cy.get('[ng-reflect-label="Invites"] > label > .ng-pristine').should('be.enabled');
		/* ==== End Cypress Studio ==== */
	});

	it('should validate form', () => {
		/* ==== Generated with Cypress Studio ==== */
		cy.get(':nth-child(1) > exp-expense-display > div > :nth-child(2)').click();
		cy.get('[ng-reflect-label="Amount (doit être superieur à "] > label > .ng-untouched').clear();
		cy.get('[ng-reflect-label="Amount (doit être superieur à "] > label > .ng-untouched').type('999');
		cy.get('[ng-reflect-label="Submit"] > button').click();
		cy.get(':nth-child(1) > exp-expense-display > div > :nth-child(2)').should('have.text', 'amount: €999.00');
		/* ==== End Cypress Studio ==== */
	});

	it('should not submit form if not touched', () => {
		/* ==== Generated with Cypress Studio ==== */
		cy.get(':nth-child(1) > exp-expense-display > div > :nth-child(2)').click();
		cy.get('[ng-reflect-label="Submit"] > button > p').click();
		cy.get('.error-message > p').should('have.text', " Aucune modification n'a été saisie ");
		/* ==== End Cypress Studio ==== */
	});
});
