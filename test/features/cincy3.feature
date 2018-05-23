@selenium @cincy-cal @cincy-cal3
Feature: Cincy3

  In order to test the Cincinnati calendar redesign
  As a Gannett employee with correct access
  I want to be able to see and run these tests

  @auto_date
  Scenario: Automatic date entry
  Given that I have loaded the Cincinnati staging calendar
  When I click on each of the radio buttons, then I should see the right header date and url

  | linknumber | preFilledDate | headerdate       | urlDate |
  | 1          | Today         | TODAY            | today   |
  #| 2          | This weekend  | FRIDAY, APRIL 28 | weekend |
  | 3          | This week     | TODAY            | week    |

  @venue_event
  Scenario: Navigating to the venue's other events
    Given that I have loaded the details of an event
    When I click on the "At venue" link
    Then I should see this text "Events at" on the page
