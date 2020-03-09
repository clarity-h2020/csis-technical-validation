/// <reference types="Cypress" />
// import Cypress from 'cypress';
// import cy from 'cypress';
let cyEnv = Cypress.env();

// ugly workaround for https://github.com/clarity-h2020/csis-technical-validation/issues/5
Cypress.config('baseUrl', cyEnv.baseUrl);

describe('CSIS view my studies', function() {
	before(() => {
		// TODO: move this common login task into a plugin, etc.
		//cy.clearCookies(); // sometimes, this does not work :-()
		//cy.getCookies().should('be.empty');

		const username = Cypress.env('username');
		const password = Cypress.env('password');
		
		expect(username, 'username was set').to.be.a('string').and.not.be.empty
        if (typeof password !== 'string' || !password) {
            throw new Error('Missing password value, set using CYPRESS_password=...');
        }  

		cy.visit('user/login');
		cy.get('#edit-name').type(username);
		cy.get('#edit-pass').type(password);
		cy.get('#edit-submit').click();
		cy.get('.field--name-username > .field__item').contains(username);

		cy.getCookies().should('not.be.empty');
		cy.getCookies().should('have.length', 1);
	});

	it('view my studies', function() {
		cy.visit('/user/');
		cy.get('.tabs > :nth-child(2) > a').click();
		cy.location().should((loc) => {
			expect(loc.pathname).to.contain('/studies') ;
		});

		cy.get('tbody > :nth-child(1) > .views-field-field-short-name').contains('AgiosDimitrios');
		cy.get('tbody > :nth-child(2) > .views-field-field-short-name').contains('Alba Iulia');

		cy.get('tbody > :nth-child(1) > .views-field-label > a').click();
		cy.location().should((loc) => {
			expect(loc.pathname).to.contain('/study/35/view/intro') ;
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