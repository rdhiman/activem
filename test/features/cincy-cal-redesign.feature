@selenium @cincy-cal @cincy-cal1
Feature: Cincy Cal Redesign

  In order to test the Cincinnati calendar redesign
  As a Gannett employee with correct access
  I want to be able to see and run these tests

  @filter_dates
  Scenario: Filtering with different dates
	Given that I have loaded the Cincinnati staging calendar
	When I enter a start date
		And I enter an end date
	Then I click on the 'More Filters' link
		And I select the "Dining" filter
		And I select the "Entertainment" filter
		And I select the "Attractions" filter
		And I select the "Music" filter
		And I select the "Holiday" filter
		And I click on the 'Search' button the first time
	Then I should see the message "69 events found"
	#Then I click on the 'last' event in the results list
	#	And that event page contains the date of "Sat., July 1"
	#Then I go back to the results page
	#Then I click on the "4" pagination link at the bottom of the page
	#	And I click on an event there
	#	And that event page contains the date of "Tue., July 4"

  @submit_event
  Scenario: Submitting an event
	Given that I have loaded the Cincinnati staging calendar
	When I click on the "Submit an event" link
	Then I should be taken to this url "http://local.cincinnati.com/share/"
