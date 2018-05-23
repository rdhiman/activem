@selenium @cincy-cal @cincy-cal4
Feature: Cincy4

  In order to test the Cincinnati calendar redesign
  As a Gannett employee with correct access
  I want to be able to see and run these tests

  @category_selection
  Scenario: Category selection
  Given that I have loaded the Cincinnati staging calendar
  When I select "This weekend"
    And I click on the 'More Filters' link
    And I select the "Education" filter
    And I click on the 'Search' button the first time
  Then I should see at least one event containing the word "CLASSES"

  @event_website
  Scenario: Event website
    Given that I have loaded the details of an event
    When I click on the "visit website" link
    Then I should be taken to this url "http://www.ywcacincinnati.org/"

  @venue_page
  Scenario: Venue page features
    Given that I have loaded an upcoming events by venue page
    When I should see this text "Events at" on the page
        And I see the link "visit website" on the page
        And I see the link "Get directions" on the page
    Then I click on the 'first' event in the venue list
