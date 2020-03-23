/// <reference types="Cypress" />
// import Cypress from 'cypress';
// import cy from 'cypress';
let cyEnv = Cypress.env();

// ugly workaround for https://github.com/clarity-h2020/csis-technical-validation/issues/5
Cypress.config('baseUrl', cyEnv.baseUrl);

describe('EMIKAT Status', function () {
    before(() => {
        cy.loginToCSIS();
    });

    it('Check EMIKAT Status Page', function () {
        cy.visit('/maintenance/check-emikat-results');
    });

	/**
	 * runs once after all tests in the block
	 */
    after(() => {
        cy.logoutFromCSIS();
    });
});