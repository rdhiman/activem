@selenium @cincy-cal @cincy-cal2
Feature: Cincy2

  In order to test the Cincinnati calendar redesign
  As a Gannett employee with correct access
  I want to be able to see and run these tests

  @filter_parameters
  Scenario: Filtering with different parameters
  Given that I have loaded the Cincinnati staging calendar
  When I enter a start date
    And I enter an end date
  Then I click on the 'More Filters' link
    And I select the "Dining" filter
    And I click on the 'Search' button the first time
  Then I should see the message "24 events found"
    And I should see the sub-heading date of "TUESDAY, JULY 4" on the page
  Then the first results should be a "FOOD / DRINK DEALS" titled "Three-Course Seafood Night"

  @main_page_navigate
  Scenario: Getting back to the main page
    Given that I have loaded the details of an event
    When I click on the "Back to results" link
    Then I should be taken to this url "http://calendar-stage.cincinnati.com/"

  @presenter_event
  Scenario: Navigating to the presenter's other events
    Given that I have loaded the details of an event
    When I click on the "By presenter" link
    Then I should see this text "Events presented by" on the page
