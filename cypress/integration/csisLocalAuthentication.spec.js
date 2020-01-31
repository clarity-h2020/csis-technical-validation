/// <reference types="Cypress" />
// import Cypress from 'cypress';
// import cy from 'cypress';
let cyEnv = Cypress.env();

// ugly workaround for https://github.com/clarity-h2020/csis-technical-validation/issues/5
Cypress.config('baseUrl', cyEnv.baseUrl);

/**
 * context() is identical to describe() and specify() is identical to it(), so choose whatever terminology works best for you.
 */
describe('CSIS local authentication tests', function() {
	/**
	 * runs once before all tests in the block
	 */
	before(() => {
		// does not work with whitelisted cookies: https://github.com/clarity-h2020/csis-technical-validation/issues/6
		cy.clearCookies();
		//cy.clearCookie('SSESS7a689a227408b9e8f3b5db4bbea62abf');
		cy.getCookies().should('be.empty');
	});

	it('login with developer login', function() {
		// This is the developer login. CAS does not work.
		// See https://github.com/clarity-h2020/csis-technical-validation/issues/4#issue-557005955
		cy.visit('user/login');
		cy.get('#edit-name').type(Cypress.env('username'));
		cy.get('#edit-pass').type(Cypress.env('password'));
		cy.get('#edit-submit').click();
		cy.get('.field--name-username > .field__item').contains(Cypress.env('username'));

		cy.get('body').trigger('keydown', { key: "F8", code: "F8", which: 119 })
	});

	it('session cookie ist set', () => {
		cy.getCookies().should('not.be.empty');
		cy.getCookies().should('have.length', 1);
	});

	it('still logged in', function() {
		cy.visit('/user/');
		cy.get('.field--name-username > .field__item').contains(Cypress.env('username'));
	});

	/**
	 * runs once after all tests in the block
	 */
	after(() => {
		cy.visit('/user/logout');
		cy.get('#block-clarity-useraccountmenu > .menu > .menu-item > a').contains('Login');
		cy.clearCookies();
		cy.getCookies().should('be.empty');
	});
});
