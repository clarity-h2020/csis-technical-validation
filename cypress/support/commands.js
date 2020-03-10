// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


// remove this when issue will be solved
// https://github.com/cypress-io/cypress/issues/781#issuecomment-567184664
Cypress.Commands.add('reallyClearCookiesCypressIssue781', () => {

    // visit /user/login because / redirects to profiles.myclimateservices.eu/cas/login :o
    cy.visit('/user/login')

    // Empty defaults
    Cypress.Cookies.defaults({
        whitelist: []
    });

    //Clear localStrage
    cy.clearLocalStorage();

    //Clear Cookies
    cy.clearCookies();

    cy.reload();

    // now any cookie with the name 'SSESS.*' will not be cleared before each test runs
    Cypress.Cookies.defaults({
        whitelist: /SSESS.*/
    });
});

Cypress.Commands.add('loginToCSIS', () => {

    // TODO: move this common login task into a plugin, etc.
    cy.reallyClearCookiesCypressIssue781();
    cy.getCookies().should('be.empty');

    const username = Cypress.env('username');
    const password = Cypress.env('password');

    expect(username, 'username was set').to.be.a('string').and.not.be.empty
    if (typeof password !== 'string' || !password) {
        throw new Error('Missing password value, set using CYPRESS_password=...');
    }

    cy.visit('user/login');
    cy.get('#edit-name').type(username);
    cy.get('#edit-pass').type(password);
    cy.get('#edit-submit').click();
    cy.get('.field--name-username > .field__item').contains(username);

    cy.getCookies().should('not.be.empty');
    cy.getCookies().should('have.length', 1);
});

Cypress.Commands.add('logoutFromCSIS', () => {
    // ugly workaround for https://github.com/clarity-h2020/csis-technical-validation/issues/13
    cy.wait(500);

    cy.visit('/user/logout');
    cy.get('#block-clarity-useraccountmenu > .menu > .menu-item > a').contains('Login');
    cy.clearCookies();
    cy.getCookies().should('be.empty');
});