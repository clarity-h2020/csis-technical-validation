/// <reference types="Cypress" />
// import Cypress from 'cypress';
// import cy from 'cypress';
let cyEnv = Cypress.env();

// ugly workaround for https://github.com/clarity-h2020/csis-technical-validation/issues/5
Cypress.config('baseUrl', cyEnv.baseUrl);

describe('CSIS view my studies', function() {
	before(() => {
		// TODO: move this common login task into a plugin, etc.
		cy.clearCookies();
		cy.getCookies().should('be.empty');
		cy.visit('user/login');
		cy.get('#edit-name').type(Cypress.env('username'));
		cy.get('#edit-pass').type(Cypress.env('password'));
		cy.get('#edit-submit').click();
		cy.get('.field--name-username > .field__item').contains(Cypress.env('username'));

		cy.getCookies().should('not.be.empty');
		cy.getCookies().should('have.length', 1);
	});

	it('view my studies', function() {
		cy.visit('/user/');
		cy.get('.tabs > :nth-child(2) > a').click();
		cy.location().should((loc) => {
			expect(loc.pathname).to.contain('/studies') ;
		});
	});

	/**
	 * runs once after all tests in the block
	 */
	after(() => {
		// TODO: move this common logout task into a plugin, etc.
		cy.visit('/user/logout');
		cy.get('#block-clarity-useraccountmenu > .menu > .menu-item > a').contains('Login');
		cy.clearCookies();
		cy.getCookies().should('be.empty');
	});
});
