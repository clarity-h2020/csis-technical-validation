/// <reference types="Cypress" />
// import Cypress from 'cypress';
// import cy from 'cypress';

/**
 * context() is identical to describe() and specify() is identical to it(), so choose whatever terminology works best for you.
 */
describe('poor mans service monitoring', function() {
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
	it('cheack service status', function() {
		cy.visit('/');
		for(let i = 6; i <= 32;i++){
			cy.get(`[data-id="${i}"] > .bg-success`).should('exist');
			cy.get(`[data-id="${i}"] > .bg-danger`).should('not.exist');
		}

		// DRUPAL CAS, only one element
		cy.get(':nth-child(6) > .list-group > .service_li > .bg-success').should('exist');
		cy.get(':nth-child(6) > .list-group > .service_li > .bg-danger').should('not.exist');
	});

	/**
	 * runs once after all tests in the block
	 */
	after(() => {
		cy.clearCookies();
		cy.getCookies().should('be.empty')
	});
});