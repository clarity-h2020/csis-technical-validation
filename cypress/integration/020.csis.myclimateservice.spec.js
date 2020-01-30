/// <reference types="Cypress" />
// import Cypress from 'cypress';
// import cy from 'cypress';
let cyEnv = Cypress.env();

// Base URL HAVOC. Of course, I can only be specified once per project. Makes Sense.
// So overwriting the baseUrl in 020 will also change the base url of the 010 test spec.
Cypress.config('baseUrl', cyEnv.profileUrl);

describe('CSIS Tests', function() {
	it('visit CSIS', function() {
		cy.visit(`${cyEnv.csisUrl}`);
		cy.getCookies().should('not.be.empty')
		cy.getCookies().should('have.length', 1)
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
