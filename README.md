# CSIS Technical Validation 

This repository serves for managing all technical validation and testing related tasks of the [CLARITY](https://clarity-h2020.eu/) Climate Services Information System ([CSIS](https://github.com/clarity-h2020/csis/)).

Technical validation of [integrated CSIS](https://github.com/clarity-h2020/csis) and its [Building Blocks](https://clarity-h2020.github.io/csis-architecture/docs/building-blocks/) is performed by means of unit tests, integration tests and user acceptance tests with the aim to increase overall software quality, stability and value proposition. 

Actual tools used for implementing CSIS technical validation concept include

- Service monitoring for detecting any service disruptions and for initiating appropriate remediation measures
- Automated unit- and integration tests based cypress.io to ensure that user interfaces as well user interactions are working as specified
- User Acceptance Tests 

## Service Monitoring

The following CSIS Services [are monitored](https://health-check.clarity.cismet.de/) with help of [statping](https://github.com/statping/statping), a status page and monitoring server for websites, applications and web services:

- [CSIS Production System](https://csis.myclimateservice.eu/)
- [CSIS Development System](https://csis-dev.myclimateservice.eu/)
- [EMIKAT REST API](https://service.emikat.at/EmiKatTst/swagger/index.html)
- [EMIKAT GeoServer](https://service.emikat.at/geoserver/clarity)
- [ATOS GeoServer](https://geoserver.myclimateservice.eu/)
- [CLARTIY CKAN](https://ckan.myclimateservice.eu/)

![image](https://user-images.githubusercontent.com/1788226/89428629-e6e50600-d73c-11ea-8e1a-01bb83b60947.png)

The staping [monitoring service](https://health-check.clarity.cismet.de/) is deployed as docker container on a dedicated machine. It is itself again monitored by a [cypress.io](https://www.cypress.io/)-based [test specification](https://github.com/clarity-h2020/csis-technical-validation/tree/health-check-cypress) that is executed on [Jenkins CI](https://ci.cismet.de/view/CLARITY/). Developers are notified by email and a [new issue](https://github.com/clarity-h2020/csis-technical-validation/issues?q=is%3Aissue+is%3Aopen+label%3ACI) is posted in repository [csis-technical-validation](https://github.com/clarity-h2020/csis-technical-validation/) when one of the monitored services fails.

## Unit tests

Automated unit tests for several apps that are build on [Jenkins CI](https://ci.cismet.de/view/CLARITY/) and that are deployed together with [CSIS Drupal Containers](https://github.com/clarity-h2020/docker-drupal) are performed on Jenkins CI. These include:

- [CSIS Helpers JS Module](https://github.com/clarity-h2020/csis-helpers-js/)
- [Map Component](https://github.com/clarity-h2020/map-component)
- [Simple Table Component](https://github.com/clarity-h2020/simple-table-component)
- [Scenario Analysis](https://github.com/clarity-h2020/scenario-analysis/issues)

![build](https://user-images.githubusercontent.com/1788226/89201824-5d093180-d5b2-11ea-8775-773a971e10d3.gif)

If any of the [unit tests](https://github.com/clarity-h2020/csis-helpers-js/#tests) fails, developers are notified by email and a new issue is posted in the respective repositories.

## Integration Tests

UI Integration tests are performed against the CSIS development and production system as well as the [myclimateservices user portal](https://profile.myclimateservices.eu/) and the [AIT EMIKAT](https://github.com/clarity-h2020/emikat/) [status page](https://csis.myclimateservice.eu/maintenance/check-emikat-results). The tests are performed with help of [cypress.io](https://www.cypress.io/) and executed on [Jenkins CI](https://ci.cismet.de/view/CLARITY/). The test specifications are maintained in repository [csis-technical-validation](https://github.com/clarity-h2020/csis-technical-validation/) in the following branches:

- [profiles-cypress](https://github.com/clarity-h2020/csis-technical-validation/tree/profiles-cypress)
- [csis-cypress](https://github.com/clarity-h2020/csis-technical-validation/tree/csis-cypress)
- [csis-dev-cypress](https://github.com/clarity-h2020/csis-technical-validation/tree/csis-dev-cypress)
- [emikat-cypress](https://github.com/clarity-h2020/csis-technical-validation/tree/emikat-cypress)

![image](https://user-images.githubusercontent.com/1788226/89428690-f82e1280-d73c-11ea-99c4-f0d8d63d2bb1.png)

If any of the test fails, the CI system will automatically post a new [issue](https://github.com/clarity-h2020/csis-technical-validation/issues?q=is%3Aissue+is%3Aopen+label%3ACI) in the repository [csis-technical-validation](https://github.com/clarity-h2020/csis-technical-validation/).

## User Acceptance Tests

To ensure that CSIS, especially the [novel climate screening tool](https://myclimateservices.eu/en/news/how-csis-these-videos-you-learn-how-you-participate-our-climate-tool), is "fit for purpose", that is, it delivers the proposed value, the [CSIS Testing Team](https://github.com/orgs/clarity-h2020/teams/csis-testing-team) performs acceptance test following the  [Acceptance Test Specification](https://github.com/clarity-h2020/csis-technical-validation/wiki/Acceptance-Test-Specification). Feedback is collected with help of the [GitHub](https://github.com/) platform by means of [testing issues](https://github.com/clarity-h2020/csis-technical-validation/issues?q=) in repository [csis-technical-validation](https://github.com/clarity-h2020/csis-technical-validation).
