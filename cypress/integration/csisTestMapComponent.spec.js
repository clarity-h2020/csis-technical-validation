/// <reference types="Cypress" />
// import Cypress from 'cypress';
// import cy from 'cypress';
let cyEnv = Cypress.env();

// ugly workaround for https://github.com/clarity-h2020/csis-technical-validation/issues/5
Cypress.config('baseUrl', cyEnv.baseUrl);

describe('CSIS test Map Component', function () {
    before(() => {
        // this does not work. See 
        cy.loginToCSIS();
    });

    it('View Risk and Impact Map', function () {
        cy.visit('/apps/map-component/build/RiskAndImpactMap/?host=https://csis.myclimateservice.eu&study_uuid=ae028e6a-ba85-4358-9c4a-4f29faa2ca92&study_area=POLYGON((23.706361%2037.918698,23.706361%2037.957689,23.780862%2037.957689,23.780862%2037.918698,23.706361%2037.918698))&emikat_id=3189&datapackage_uuid=2434ce93-93d4-4ca2-8618-a2de768d3f16&write_permissions=1&study_variant=BASELINE&time_period=20410101-20701231&emissions_scenario=rcp45&event_frequency=Rare&grouping_tag=taxonomy_term--hazards');
        cy.get('.rlglc-a').click();
        cy.get('[data-layername="number_of affected persons"]');
    });

    /**
     * fubar: https://github.com/clarity-h2020/csis-technical-validation/issues/22
     */
    it.skip('View Risk and Impact Map', function () {
        cy.visit('/apps/map-component/build/RiskAndImpactMap/?host=https://csis.myclimateservice.eu&study_uuid=ae028e6a-ba85-4358-9c4a-4f29faa2ca92&study_area=POLYGON((23.706361%2037.918698,23.706361%2037.957689,23.780862%2037.957689,23.780862%2037.918698,23.706361%2037.918698))&emikat_id=3189&datapackage_uuid=2434ce93-93d4-4ca2-8618-a2de768d3f16&write_permissions=1&study_variant=BASELINE&time_period=20410101-20701231&emissions_scenario=rcp45&event_frequency=Rare&grouping_tag=taxonomy_term--hazards');
        cy.get('.rlglc-a').click();

        // does not work despite the documentation tells otherwise https://docs.cypress.io/api/commands/get.html#Selector:
        //cy.get('.rlglc-option[data-layername="WorldTopoMap"]');

        //cy.get('#heat-Heat_mortality\ risk\/impact\ screening-678')
        //cy.get(':nth-child(5) > .rlglc-option > .rlglc-title')

        // mousemove?! See https://stackoverflow.com/a/56704903
        // does not work on ci: https://github.com/clarity-h2020/csis-technical-validation/issues/22#issuecomment-603041686
        //cy.get('[data-layername="number_of affected persons"]').trigger('mousemove').click();
        //cy.get('[style="display: inline; bottom: 50px; position: absolute; z-index: 1000; left: 25px;"] > div > img').should('exist');

        // does not work at all. why? 
        //cy.get('[data-layername="number_of affected persons"]').check();
        //cy.get('[data-layername="number_of affected persons"]').should('be.checked');

        // wait for layers and element to appear
        cy.get('[data-layername="number_of affected persons"]');
        // find last option element
        cy.get('[type="radio"]').last().check();
        // still does not work on CI: https://github.com/clarity-h2020/csis-technical-validation/issues/22#issuecomment-603063616
        cy.get('[type="radio"]').last().should('be.checked');
        // this is ridiculous: .should('be.checked'); on element works but check(); does not
        cy.get('[data-layername="number_of affected persons"]').should('be.checked');

        cy.get('[style="display: inline; bottom: 50px; position: absolute; z-index: 1000; left: 25px;"] > div > img').should('exist');
    });

    // does not work: opening both layer widgets at the same time
    it.skip('View Synchronised Risk and Impact Map', function () {
        cy.visit('/apps/map-component/build/SynchronisedRiskAndImpactMap/?host=https://csis.myclimateservice.eu&study_uuid=ae028e6a-ba85-4358-9c4a-4f29faa2ca92&study_area=POLYGON((23.706361%2037.918698,23.706361%2037.957689,23.780862%2037.957689,23.780862%2037.918698,23.706361%2037.918698))&emikat_id=3189&datapackage_uuid=2434ce93-93d4-4ca2-8618-a2de768d3f16&write_permissions=1&study_variant=BASELINE&time_period=20410101-20701231&emissions_scenario=rcp45&event_frequency=Rare&grouping_tag=taxonomy_term--hazards');
        cy.get('.rlglc-a').click({ multiple: true });

        // does not work despite the documentation tells otherwise https://docs.cypress.io/api/commands/get.html#Selector:
        //cy.get('.rlglc-option[data-layername="WorldTopoMap"]');

        cy.get('[data-layername="number_of affected persons"]').click({ multiple: true });

        cy.get('[style="display: inline; bottom: 50px; position: absolute; z-index: 1000; left: 25px;"] > div > img').should('exist');
    });

	/**
	 * runs once after all tests in the block
	 */
    after(() => {
        cy.logoutFromCSIS();
    });
});