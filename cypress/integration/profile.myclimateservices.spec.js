/// <reference types="Cypress" />
// import Cypress from 'cypress';
// import cy from 'cypress';

/**
 * context() is identical to describe() and specify() is identical to it(), so choose whatever terminology works best for you.
 */
describe('myclimateservices CAS Tests', function() {
	/**
	 * runs once before all tests in the block
	 */
	before(() => {
		const username = Cypress.env('username');
		const password = Cypress.env('password');
		
		expect(username, 'username was set').to.be.a('string').and.not.be.empty
        if (typeof password !== 'string' || !password) {
            throw new Error('Missing password value, set using CYPRESS_password=...');
        }  

		cy.visit('/cas/logout');
		cy.get('#block-mcs-profiles-theme-content > .content').contains('You have been logged out');
	});

	it('login with CAS', function() {
		const username = Cypress.env('username');
		const password = Cypress.env('password');
		
		// the redirection from profiles to CSIS to ${cyEnv.baseUrl} will result in the dreaded
		// Refused to display 'https://csis.myclimateservice.eu/' in a frame because it set 'X-Frame-Options' to 'sameorigin'
		// error :-(
		// cy.visit(`${cyEnv.casUrl}/login?service=${cyEnv.baseUrl}/casservice`);
		cy.visit('/cas/login');
		// this requires presence of env variables, e.g. loaded from cypress.env.json 

		cy.get('#edit-username').type(username);
		cy.get('#edit-password').type(password, {log: false});
		cy.get('#edit-submit').click();
		// manually 'redirect' to CAS at CSIS -> does not work.
		// See https://github.com/clarity-h2020/csis-technical-validation/issues/4#issue-557005955
		//cy.visit(`${cyEnv.baseUrl}/casservice`);
		cy.get('#block-mcs-profiles-theme-content > .content').contains('You are logged in to CAS single sign on.');
	});

	
	it('session cookie is set', () => {
		cy.getCookies().should('not.be.empty')
		cy.getCookies().should('have.length', 1)
	  })


	it('still logged in with CAS', function() {
		cy.visit('/cas/login');
		cy.get('#block-mcs-profiles-theme-content > .content').contains('You are logged in to CAS single sign on.');
	});

	/**
	 * runs once after all tests in the block
	 */
	after(() => {
		cy.visit('/cas/logout'); 
		cy.get('#block-mcs-profiles-theme-content > .content').contains('You have been logged out');
		cy.clearCookies();
		cy.getCookies().should('be.empty')
	});
});