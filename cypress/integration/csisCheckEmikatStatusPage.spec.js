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

    it('Check last EMIKAT calculations test', function () {
        cy.visit('/maintenance/check-emikat-results');
        cy.get('.page-title').contains('Results for Emikat test Study');
        cy.get('.total-batchjob-count').should('have.text', '13');
        cy.get('.batchjobs').find('li').should('have.length', 13);
        cy.get('.total-warning-count').should('have.text', '0');

        // It seems that there is no built-in convenient method to skip all remaining tests   
        // if one test fails. See https://github.com/cypress-io/cypress/issues/518 :-(

        cy.visit('/maintenance/trigger-emikat-test');
        cy.get('.trigger-failure').should('not.exist');
        cy.get('.trigger-success').contains('Updates in Test Study were successfully sent to Emikat. ');
    
    });

    /**
     * Disabled. Is triggered even if previous test fails.
     */
    /*it('trigger EMIKAT calculations test', function () {
        cy.visit('/maintenance/trigger-emikat-test');
        cy.get('.trigger-failure').should('not.exist');
        cy.get('.trigger-success').contains('Updates in Test Study were successfully sent to Emikat. ');
    });*/

	/**
	 * runs once after all tests in the block
	 */
    after(() => {
        cy.logoutFromCSIS();
    });
});