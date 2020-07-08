/// <reference types="Cypress" />
// import Cypress from 'cypress';
// import cy from 'cypress';
let cyEnv = Cypress.env();

// ugly workaround for https://github.com/clarity-h2020/csis-technical-validation/issues/5
Cypress.config('baseUrl', cyEnv.baseUrl);

describe('CSIS DEV test Scenario Analysis Component', function () {
    before(() => {
        // this does not work. See 
        cy.loginToCSIS();
    });

    // wontfix: https://github.com/clarity-h2020/csis-technical-validation/issues/15
    it.skip('View Risk and Impact Map', function () {
        cy.visit('/study/35/step/1528/view/scenario-analysis');
    });

	/**
	 * runs once after all tests in the block
	 */
    after(() => {
        cy.logoutFromCSIS();
    });

});