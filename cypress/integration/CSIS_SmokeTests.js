/// <reference types="Cypress" />
// import Cypress from 'cypress';
// import cy from 'cypress';
let cyEnv = Cypress.env();
Cypress.config('baseUrl', cyEnv.baseUrl);

/**
 * context() is identical to describe() and specify() is identical to it(), so choose whatever terminology works best for you.
 */
describe('CLARTIY CSIS CAS Tests', function() {
	/**
	 * runs once before all tests in the block
	 */
	before(() => {
		cy.visit(`${cyEnv.casUrl}/logout`); 
		cy.get('#block-mcs-profiles-theme-content > .content').contains('You have been logged out');
	});

	it('login with CAS', function() { 
		// the redirection from profiles to CSIS to ${cyEnv.baseUrl} will result in the dreaded 
		// Refused to display 'https://csis.myclimateservice.eu/' in a frame because it set 'X-Frame-Options' to 'sameorigin'
		// error :-(
		// cy.visit(`${cyEnv.casUrl}/login?service=${cyEnv.baseUrl}/casservice`); 
		cy.visit(`${cyEnv.casUrl}/login`); 
		cy.get('#edit-username').type(Cypress.env('username'));
		cy.get('#edit-password').type(Cypress.env('password'));
		cy.get('#edit-submit').click();
		// manually 'redirect' to CAS at CSIS
		cy.visit(`${cyEnv.baseUrl}/casservice`); 
	});

	/**
	 * runs once after all tests in the block
	 */
	after(() => {
		cy.visit(`${cyEnv.casUrl}/logout`); 
		cy.get('#block-mcs-profiles-theme-content > .content').contains('You have been logged out');
	});

});

describe.skip('csis smoke tests', function() {
	beforeEach(() => {
		console.log('Cypress.env(baseUrl)', Cypress.env('baseUrl'));

		cy.visit('/user/login'); //https://csis.myclimateservice.eu/user/login')
		cy.get('#edit-name').type(Cypress.env('username'));
		cy.get('#edit-pass').type(Cypress.env('password'));
		cy.get('#edit-submit').click();
	});
	it('test the Screenshot-Button interactively', function() {
		cy.get('#block-clarity-main-menu > .menu > :nth-child(2) > a').click({ force: true });
		cy.wait(1000);
		cy.get(':nth-child(5) > .views-field-label > a').click({ force: true });
		cy.get('div > .nav > :nth-child(1) > .nav-link').click({ force: true });
		cy.get('.field-content > .nav > :nth-child(4) > .nav-link').click({ force: true });
		cy.wait(3000);
		cy.get('p > .btn').click({ force: true });
		cy.wait(2000);
		cy.get('.image-style-max-650x650').should('exist');
		//cy.get('.cke_wysiwyg_frame').type("testing with cypress test").should('have.value', 'testing with cypress test')

		cy.get('.ui-dialog-buttonset > :nth-child(2)').click({ force: true });
		cy.get('.field--name-field-image > img').should('exist');
	});
	it('test the Screenshot-Button via Route', function() {
		cy.visit('/study/1/step/2/view/maps');
		cy.wait(3000);
		cy.get('p > .btn').click({ force: true });
		cy.wait(15000);
		//cy.get('.image-style-max-650x650').should('exist');
		//cy.get('.cke_wysiwyg_frame').type("testing with cypress test").should('have.value', 'testing with cypress test')
		cy.get('.ui-dialog-buttonset > :nth-child(2)').click({ force: true });
		cy.get('.field--name-field-image > img').should('exist');
	});
});
