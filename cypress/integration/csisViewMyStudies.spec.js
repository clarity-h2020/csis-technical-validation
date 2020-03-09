/// <reference types="Cypress" />
// import Cypress from 'cypress';
// import cy from 'cypress';
let cyEnv = Cypress.env();

// ugly workaround for https://github.com/clarity-h2020/csis-technical-validation/issues/5
Cypress.config('baseUrl', cyEnv.baseUrl);

describe('CSIS view my studies', function() {
	before(() => {
		// TODO: move this common login task into a plugin, etc.
		//cy.clearCookies(); // this does not work
		//cy.getCookies().should('be.empty');

		expect(Cypress.env('username')).not.to.be.undefined
		expect(Cypress.env('password')).not.to.be.undefined

		cy.visit('user/login');
		cy.get('#edit-name').type(Cypress.env('username'));
		cy.get('#edit-pass').type(Cypress.env('password'));
		cy.get('#edit-submit').click();
		cy.get('.field--name-username > .field__item').contains(Cypress.env('username'));

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

	it('Study #35 >> Study Tab', function() {
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


	it('Study #35 >> HC Tab', function() {
		cy.visit('/study/35');
		cy.get('div > .nav > :nth-child(1) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname).to.contain('/view/introduction') ;
		});
		
		// Data Tab. Step ids my change ...
		// Nice idea, but does not work. cy.location() returns a PROMISE! :o
		//cy.visit(cy.location('pathname').substring(0, cy.location('pathname').lastIndexOf('/')) + '/data');

		cy.get('.field-content > .nav > :nth-child(2) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname).to.contain('/view/data') ;
		});

		cy.get('.field-content > .nav > :nth-child(3) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname).to.contain('/view/table') ;
		});

		cy.get('.field-content > .nav > :nth-child(4) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname).to.contain('/view/maps') ;
		});

		// NOTE: Twins only visible for logged-in users!
		cy.get('.field-content > .nav > :nth-child(5) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname).to.contain('/view/twins') ;
		});

		cy.get('.field-content > .nav > :nth-child(6) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname).to.contain('/view/summary') ;
		});
	});

	/**
	 * runs once after all tests in the block
	 */
	/*after(() => {
		// TODO: move this common logout task into a plugin, etc.
		cy.visit('/user/logout');
		cy.get('#block-clarity-useraccountmenu > .menu > .menu-item > a').contains('Login');
		cy.clearCookies();
		cy.getCookies().should('be.empty');
	});*/
});
