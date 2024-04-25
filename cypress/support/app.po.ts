// Location
export const goToHomePage = () => cy.visit('http://localhost:4200');
export const goToExpensesPage = () => cy.visit('http://localhost:4200/expenses');

// Get component
export const getGreeting = () => cy.get('h1');
export const getH2 = () => cy.get('h2');
