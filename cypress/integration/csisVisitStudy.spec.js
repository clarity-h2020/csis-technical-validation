/// <reference types="Cypress" />
// import Cypress from 'cypress';
// import cy from 'cypress';
let cyEnv = Cypress.env();

// ugly workaround for https://github.com/clarity-h2020/csis-technical-validation/issues/5
Cypress.config('baseUrl', cyEnv.baseUrl);

describe('CSIS visit Study 36', function () {
	before(() => {
		cy.loginToCSIS();
	});

	it('view my studies', function () {
		cy.visit('/user/');
		cy.get('.tabs > :nth-child(2) > a').click();
		cy.location().should((loc) => {
			expect(loc.pathname).to.contain('/studies');
		});

		cy.get('tbody > :nth-child(1) > .views-field-field-short-name').contains('AgiosDimitrios');
		cy.get('tbody > :nth-child(2) > .views-field-field-short-name').contains('Alba Iulia');

		cy.get('tbody > :nth-child(1) > .views-field-label > a').click();
		cy.location().should((loc) => {
			expect(loc.pathname).to.contain('/study/35/view/intro');
		});
	});

	it('Study #35 >> Study Tab', function () {
		cy.visit('/study/35/view/intro');
		cy.visit('/study/35/view/team');
		cy.visit('/study/35/view/context');
		cy.get('.field--name-field-short-name > .field__item').contains('AgiosDimitrios');
		cy.visit('/study/35/view/area');
		cy.visit('/study/35/view/data');
		cy.visit('/study/35/view/summary');

		cy.get('div > .nav > :nth-child(1) > .nav-link').contains('Hazard Characterization');
		cy.get('div > .nav > :nth-child(2) > .nav-link').contains('Hazard Characterization - Local Effects');
		cy.get('div > .nav > :nth-child(3) > .nav-link').contains('Exposure Evaluation');
		cy.get('div > .nav > :nth-child(4) > .nav-link').contains('Vulnerability Analysis');
		cy.get('div > .nav > :nth-child(5) > .nav-link').contains('Risk and Impact Assessment');
		cy.get('div > .nav > :nth-child(6) > .nav-link').contains('Identify Adaptation Options');
	});

	/**
	 * Hazard Characterization
	 */
	it('Study #35 >> Hazard Characterization', function () {
		cy.visit('/study/35');
		cy.get('div > .nav > :nth-child(1) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Introduction').to.contain('/view/introduction');
		});


		// Data Tab. Step ids may change ...
		// Nice idea, but does not work. cy.location() returns a PROMISE! :o
		//cy.visit(cy.location('pathname').substring(0, cy.location('pathname').lastIndexOf('/')) + '/data');

		cy.get('.field-content > .nav > :nth-child(2) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Data').to.contain('/view/data');
		});

		cy.get('.field-content > .nav > :nth-child(3) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Table').to.contain('/view/table');
		});

		cy.get('.field-content > .nav > :nth-child(4) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Map').to.contain('/view/maps');
		});

		// NOTE: Twins only visible for logged-in users!
		cy.get('.field-content > .nav > :nth-child(5) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Twins').to.contain('/view/twins');
		});

		cy.get('.field-content > .nav > :nth-child(6) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Summary').to.contain('/view/summary');
		});
	});

	/**
	 * Hazard Characterization - Local Effects
	 */
	it('Study #35 >> Hazard Characterization - Local Effects', function () {
		cy.visit('/study/35');
		cy.get('div > .nav > :nth-child(2) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Introduction').to.contain('/view/introduction');
		});

		cy.get('.field-content > .nav > :nth-child(2) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Data').to.contain('/view/data');
		});

		cy.get('.field-content > .nav > :nth-child(3) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Table').to.contain('/view/table');
		});

		cy.get('.field-content > .nav > :nth-child(4) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Map').to.contain('/view/maps');
		});

		// NOTE: Twins only visible for logged-in users and not in HC-LE, etc.
		/*cy.get('.field-content > .nav > :nth-child(5) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Twins').to.contain('/view/twins') ;
		});*/

		cy.get('.field-content > .nav > :nth-child(5) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Summary').to.contain('/view/summary');
		});
	});

	/**
	 * Exposure Evaluation
	 */
	it('Study #35 >> Exposure Evaluation', function () {
		cy.visit('/study/35');
		cy.get('div > .nav > :nth-child(3) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Introduction').to.contain('/view/introduction');
		});

		cy.get('.field-content > .nav > :nth-child(2) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Data').to.contain('/view/data');
		});

		cy.get('.field-content > .nav > :nth-child(3) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Table').to.contain('/view/table');
		});

		cy.get('.field-content > .nav > :nth-child(4) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Map').to.contain('/view/maps');
		});

		// NOTE: Twins only visible for logged-in users!
		cy.get('.field-content > .nav > :nth-child(5) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Twins').to.contain('/view/twins');
		});

		cy.get('.field-content > .nav > :nth-child(6) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Summary').to.contain('/view/summary');
		});
	});

	/**
	 * Vulnerability Analysis
	 */
	it('Study #35 >> Vulnerability Analysis', function () {
		cy.visit('/study/35');
		cy.get('div > .nav > :nth-child(4) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Introduction').to.contain('/view/introduction');
		});

		cy.get('.field-content > .nav > :nth-child(2) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Data').to.contain('/view/data');
		});

		cy.get('.field-content > .nav > :nth-child(3) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Table').to.contain('/view/table');
		});

		cy.get('.field-content > .nav > :nth-child(4) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Summary').to.contain('/view/summary');
		});
	});

	/**
	 * Risk and Impact Assessment
	 */
	it('Study #35 >> Risk and Impact Assessment', function () {
		cy.visit('/study/35');
		cy.get('div > .nav > :nth-child(5) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Introduction').to.contain('/view/introduction');
		});

		cy.get('.field-content > .nav > :nth-child(2) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Data').to.contain('/view/data');
		});

		cy.get('.field-content > .nav > :nth-child(3) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Table').to.contain('/view/table');
		});

		cy.get('.field-content > .nav > :nth-child(4) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Map').to.contain('/view/maps');
		});

		cy.get('.field-content > .nav > :nth-child(5) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Twins').to.contain('/view/scenario-analysis');
		});

		cy.get('.field-content > .nav > :nth-child(6) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Summary').to.contain('/view/summary');
		});
	});

	/**
	 * Identify Adaptation Options
	 */
	it('Study #35 >> Identify Adaptation Options', function () {
		cy.visit('/study/35');
		cy.get('div > .nav > :nth-child(6) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Introduction').to.contain('/view/introduction');
		});

		cy.get('.field-content > .nav > :nth-child(2) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Table').to.contain('/view/table');
		});

		cy.get('.field-content > .nav > :nth-child(3) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Data').to.contain('/view/external');
		});

		cy.get('.field-content > .nav > :nth-child(4) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Data').to.contain('/view/twins');
		});

		cy.get('.field-content > .nav > :nth-child(5) > .nav-link').click();
		cy.location().should((loc) => {
			expect(loc.pathname, 'Summary').to.contain('/view/summary');
		});
	});

	/**
	 * runs once after all tests in the block
	 * Naming Things: This method should be called afterAll!
	 */
	after(() => {
		cy.logoutFromCSIS();
	});
});
