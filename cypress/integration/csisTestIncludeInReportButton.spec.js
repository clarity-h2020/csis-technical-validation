/// <reference types="Cypress" />
// import Cypress from 'cypress';
// import cy from 'cypress';
let cyEnv = Cypress.env();

// ugly workaround for https://github.com/clarity-h2020/csis-technical-validation/issues/5
Cypress.config('baseUrl', cyEnv.baseUrl);

describe('CSIS view my studies', function() {
	before(() => {
        // TODO: move this common login task into a plugin, etc.
        // TODO: avoid UI login as described here: https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/
		cy.clearCookies(); // this does not work
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
		cy.get('.field--name-username > .field__item').contains(Cypress.env('username'));

		cy.getCookies().should('not.be.empty');
		cy.getCookies().should('have.length', 1);
	});

    // Disabled. See 
	it.skip('Study #35 >> Study Tab', function() {
		cy.visit('/study/35/view/intro');
		cy.visit('/study/35/view/team');
		cy.visit('/study/35/view/context');
		cy.visit('/study/35/view/area');
		cy.visit('/study/35/view/data');
		cy.visit('/study/35/view/summary');
	});

	it.only('Study #35 >> Study Area Map >> Include in Report', function() {
		cy.visit('/study/35/view/area');
		// include in report ....
		cy.get('.token-field-check-member > p > .btn').click();
		cy.visit('/study/35/view/summary');
		cy.get('.use-ajax').should('exist');
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
