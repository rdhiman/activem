@selenium @cincy-cal @cincy-cal5
Feature: Cincy5

  In order to test the Cincinnati calendar redesign
  As a Gannett employee with correct access
  I want to be able to see and run these tests

  @filter_notification
  Scenario: Search filter notification
  Given that I have loaded the Cincinnati staging calendar
  When I click on the 'More Filters' link
    And I select the "Dining" filter
    And I select the "Entertainment" filter
    And I type 'Downtown' in the 'Location' field
    And I click on the 'Search' button again
  Then the number '3' should appear next to the 'More Filters' link

  @obtain_directions
  Scenario: Getting directions
    Given that I have loaded the details of an event
    When I click on the "Get directions" link
    Then I should be taken to the correct url

  @social_sharing
  Scenario: Social network sharing buttons
    Given that I have loaded the details of an event
    And when I click on the 'Twitter' logo
    Then I should be directed to the 'Twitter' url to share details for the event on my wall or feed
    When I click on the 'Facebook' logo
    Then I should be directed to the 'Facebook' url to share details for the event on my wall or feed
