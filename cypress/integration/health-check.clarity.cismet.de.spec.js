/// <reference types="Cypress" />
// import Cypress from 'cypress';
// import cy from 'cypress';

/**
 * context() is identical to describe() and specify() is identical to it(), so choose whatever terminology works best for you.
 */
describe('poor mans service monitoring', function () {
	/**
	 * runs once before all tests in the block
	 */
	before(() => {
		//Clear localStorage
		cy.clearLocalStorage();

		//Clear Cookies
		cy.clearCookies();
	});

	/**
	 * WTF?
	 * See https://github.com/clarity-h2020/csis-technical-validation/issues/2
	 * for why this is necessary
	 */
	it('check service status', function () {
		cy.visit('/');
		cy.get('.bg-danger > .badge').should('not.exist');
	});

	/**
	 * runs once after all tests in the block
	 */
	after(() => {
		cy.clearCookies();
		cy.getCookies().should('be.empty')
	});
});