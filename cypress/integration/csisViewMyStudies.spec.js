/// <reference types="Cypress" />
// import Cypress from 'cypress';
// import cy from 'cypress';
let cyEnv = Cypress.env();

// ugly workaround for https://github.com/clarity-h2020/csis-technical-validation/issues/5
Cypress.config('baseUrl', cyEnv.baseUrl);

describe('CSIS view my studies', function() {
	before(() => {
		cy.loginToCSIS();
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
		cy.logoutFromCSIS();
	});
});