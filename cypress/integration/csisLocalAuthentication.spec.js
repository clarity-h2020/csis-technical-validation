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
		const username = Cypress.env('username');
		const password = Cypress.env('password');

		cy.reallyClearCookiesCypressIssue781();
		cy.getCookies().should('be.empty');
		
		expect(username, 'username was set').to.be.a('string').and.not.be.empty
        if (typeof password !== 'string' || !password) {
            throw new Error('Missing password value, set using CYPRESS_password=...');
        }  

		// If you're not logged-in, this yields '403 - Forbidden (text/html)':
		//cy.visit('/user/logout');
	});

	it('login with developer login', function() {
		// This is the developer login. CAS does not work.
		// See https://github.com/clarity-h2020/csis-technical-validation/issues/4#issue-557005955
		const username = Cypress.env('username');
		const password = Cypress.env('password');

		cy.visit('user/login');
		cy.get('#edit-name').type(username);
		cy.get('#edit-pass').type(password, {log: false});
		cy.get('#edit-submit').click();
		cy.get('.field--name-username > .field__item').contains(username);

		cy.get('body').trigger('keydown', { key: "F8", code: "F8", which: 119 })
	});

	it('session cookie is set', () => {
		cy.getCookies().should('not.be.empty');
		cy.getCookies().should('have.length', 1);
	});

	it('still logged in', function() {
		const username = Cypress.env('username');
		cy.visit('/user/');
		cy.get('.field--name-username > .field__item').contains(username);
	});

	/**
	 * runs once after all tests in the block
	 */
	after(() => {
		cy.logoutFromCSIS();
	});
});
