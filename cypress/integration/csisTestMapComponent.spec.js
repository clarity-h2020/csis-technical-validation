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
    });

	/**
	 * runs once after all tests in the block
	 */
    after(() => {
        //cy.logoutFromCSIS();
    });

});