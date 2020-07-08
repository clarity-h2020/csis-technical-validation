/// <reference types="Cypress" />
// import Cypress from 'cypress';
// import cy from 'cypress';
let cyEnv = Cypress.env();

// ugly workaround for https://github.com/clarity-h2020/csis-technical-validation/issues/5
Cypress.config('baseUrl', cyEnv.baseUrl);

describe('CSIS DEV view my studies', function() {
	before(() => {
        // TODO: move this common login task into a plugin, etc.
        // TODO: avoid UI login as described here: https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/
		cy.reallyClearCookiesCypressIssue781();
		cy.getCookies().should('be.empty');
        
        const username = Cypress.env('username');
        const password = Cypress.env('password');

        //AARRRRRGGGGGGGGGGGGHHHHHHHHHHH: prints the password to the log:
		//expect(Cypress.env('username'),'expect username not to be empty').not.to.be.undefined
        //expect(Cypress.env('password'),'expect password not to be empty').not.to.be.undefined
        
        expect(username, 'username was set').to.be.a('string').and.not.be.empty
        //See https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/
        if (typeof password !== 'string' || !password) {
            throw new Error('Missing password value, set using CYPRESS_password=...');
        }        

		cy.visit('user/login');
		cy.get('#edit-name').type(username);
		cy.get('#edit-pass').type(password, {log: false});
		cy.get('#edit-submit').click();
		cy.get('.field--name-username > .field__item').contains(username);

		cy.getCookies().should('not.be.empty');
		cy.getCookies().should('have.length', 1);
	});

	it('Study #35 >> Study Area Map >> Include in Report', function() {
		cy.visit('/study/35/view/area');
		// include in report ....
		cy.get('.token-field-check-member > p > .btn').should('exist');
		cy.get('.token-field-check-member > p > .btn').click();

		// used to work, now doesn't. :-(
		//cy.get('#ui-id-1').contains('Edit Report image Report image');

		// Although they exist in DOM, cypress is not able to find any of these:
		//cy.get('.ui-dialog-titlebar');
		//cy.get('.js-text-full text-full form-text');
		//cy.get('.js-text-full text-full form-text[data-test-id="edit-title-0-value"]');

		// sometimes works, sometimes doens't: 
		//cy.get('#drupal-modal')

		// this doens't work either:
		//cy.get('#drupal-modal').find('input[data-test-id="edit-title-0-value"]').should('exist');

		cy.get('.ui-dialog-buttonset > .button--danger').should('exist');
		cy.get('.ui-dialog-buttonset > .button--danger').click();
		cy.get('#edit-submit').click();
		cy.get('[data-drupal-messages=""] > .messages').contains('The Report image Report image has been deleted.');
	});

	/**
	 * runs once after all tests in the block
	 */
	after(() => {
		cy.logoutFromCSIS();
	});
});
