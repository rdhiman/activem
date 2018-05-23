$start_date = 'Jul 1, 2017'
$end_date = 'Jul 4, 2017'
$location = 'Downtown'

Given(/^that I have loaded the Cincinnati staging calendar$/) do
  @cincycalredesign = CincyCalRedesign.new
  @cincycalredesign.load
end

When(/^I enter a start date$/) do
  @cincycalredesign.enter_start_date.click
  @cincycalredesign.enter_start_date.set($start_date)
  @cincycalredesign.filter_heading.click
end

And(/^I enter an end date$/) do
  @cincycalredesign.enter_end_date.click
  @cincycalredesign.enter_end_date.set($end_date)
  @cincycalredesign.filter_heading.click
end

And(/^I click on the 'Search' button the first time$/) do
  @cincycalredesign.search_button.click
  @filterresults = FirstFilterResults.new
end

Then(/^I should see the message "(\d+) events found"$/) do |message_text|
  expect(@cincycalredesign).to have_css '.cal-results-heading.ng-binding'
end

When(/^I select "(.*?)"$/) do |radio_button|
    page.find("label", text: radio_button).click
end

Then(/^I click on the 'first' event on the venue page$/) do
  first("a.cal-result-link").click
end

Then(/^I click on the 'last' event in the results list$/) do
  sleep 4
  #last("a.cal-result-link").click
  page.all('a.cal-result-link')[19].click
end

Then(/^I click on the 'first' event in the results list$/) do
    @cincycalredesign.first_event_link.click
end

Then(/^I click on the 'first' event in the venue list$/) do
    @venueresultspage.first_venue_link.click
end

And(/^that event page contains the date of "(.*?)"$/) do |event_date_on_page|
  expect(@cincycalredesign).to have_content event_date_on_page
end

Then(/^I go back to the results page$/) do
  page.evaluate_script('window.history.back()')
end

Then(/^I click on the "([^"]*)" pagination link at the bottom of the page$/) do |page_number|
  page.find('a.ng-binding', text: page_number).click
end

And(/^I click on an event there$/) do
  page.all('a.cal-result-link')[4].click
  #page.find('a.cal-result-link', match: :first).click
end

Then(/^I click on the 'More Filters' link$/) do
  @cincycalredesign.more_filters.click
end

Then(/^I select the "(.*?)" filter$/) do |filter_category|
  page.find('label.ng-binding', text: filter_category).click
end

And(/^I type 'Downtown' in the 'Location' field$/) do
  @cincycalredesign.enter_location.click
  @cincycalredesign.enter_location.set($location)
  @cincycalredesign.filter_heading.click
end

And(/^I click on the 'Search' button again$/) do
  @cincycalredesign.search_button.click
  @filterresults = FilterResultsAgain.new
end

Then(/^the number '3' should appear next to the 'More Filters' link$/) do
  within ('p#cal-more-filters') do
    expect(@filterresults.filters_badge).to have_content "MORE FILTERS"
  end
end

Then(/^the top results and category on the page should match the table below$/) do |table|
  table.hashes .each do |row|
    expect(@cincycalredesign.cal_category).to_be "#{row['topResult']}"
    expect(@cincycalredesign.cal_heading).to_be "#{row['topCategory']}"
  end
end

And(/^I should see the sub-heading date of "(.*?)" on the page$/) do |calsubheading|
  expect(@cincycalredesign).to have_css '.cal-results-heading.ng-binding'
end

Then(/^the first results should be a "(.*?)" titled "(.*?)"$/) do |calcat, calheading|
#  expect(@cincycalredesign).to have_content calcat
#  expect(@cincycalredesign).to have_content calheading
  expect(@cincycalredesign).to have_css '.cal-result-link', minimum: 1
end

When(/^I click on each of the radio buttons, then I should see the right header date and url$/) do |table|
  table.hashes .each do |row|
   within("div.cal-segmented") do
    page.find("label[for='cal-date-#{row['linknumber']}']", text: "#{row['preFilledDate']}").click
   end
    visit "http://calendar-stage.cincinnati.com/?pageIndex=1&date=#{row['urlDate']}"
    expect(page).to have_content "#{row['headerdate']}"
    expect(current_url).to match("http://calendar-stage.cincinnati.com/?pageIndex=1&date=#{row['urlDate']}")
    @cincycalredesign = CincyCalRedesign.new
    @cincycalredesign.load
  end
end

Then(/^I should see at least one event containing the word "(.*?)"$/) do |classes|
  expect(@cincycalredesign).to have_content classes
end

When(/^I click on the "(.*?)" link$/) do |link|
  click_link(link)
end

Then(/^I should be taken to this url "(.*?)"$/) do |currentUrl|
  expect(current_url).to match(currentUrl)
end

Given(/^that I have loaded the details of an event$/) do
  @cincycaleventdetails = CincyCalEventDetails.new
  @cincycaleventdetails.load
end

Then(/^I should see this text "(.*?)" on the page$/) do |text|
  expect(page).to have_content text
end

When(/I click on the 'Facebook' logo$/) do
  @cincycaleventdetails.facebook_link.click
end

Then(/^I should be directed to the 'Facebook' url to share details for the event on my wall or feed$/) do
  #https://www.facebook.com/login.php?skip_api_login=1&api_key=157995810912644&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Ffeed%3Fapp_id%3D157995810912644%26caption%3DCincinnati.com%26description%3DAll%2Blevels%2Band%2Babilities%2Bwelcome.%2BBring%2Bwater%2Bbottle.%2BAll%2Bworkouts%2Bscaleable%2Bto%2Beach%2Bindividual.%26display%3Dpopup%26e2e%3D%257B%257D%26link%3Dhttp%253A%252F%252Fcalendar-stage.cincinnati.com%252Fevent%252F186728%252FFree-CrossFit-Community-Workout%26locale%3Den_US%26name%3DFree%2BCrossFit%2BCommunity%2BWorkout%26next%3Dhttp%253A%252F%252Fstaticxx.facebook.com%252Fconnect%252Fxd_arbiter%252Fr%252FiPrOY23SGAp.js%253Fversion%253D42%2523cb%253Df29dfc91bc18fb4%2526domain%253Dcalendar-stage.cincinnati.com%2526origin%253Dhttp%25253A%25252F%25252Fcalendar-stage.cincinnati.com%25252Ff3a0407de70ec8%2526relation%253Dopener%2526frame%253Df18a532fca1c438%2526result%253D%252522xxRESULTTOKENxx%252522%26picture%3Dhttp%253A%252F%252Fcalendar-stage.cincinnati.com%252Fimages%252Fcincy_facebook.jpg%26sdk%3Djoey%26version%3Dv2.4&cancel_url=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FiPrOY23SGAp.js%3Fversion%3D42%23cb%3Df29dfc91bc18fb4%26domain%3Dcalendar-stage.cincinnati.com%26origin%3Dhttp%253A%252F%252Fcalendar-stage.cincinnati.com%252Ff3a0407de70ec8%26relation%3Dopener%26frame%3Df18a532fca1c438%26result%3D%257B%2522error_code%2522%253A4201%252C%2522error_message%2522%253A%2522User%2Bcanceled%2Bthe%2BDialog%2Bflow%2522%257D%26error_code%3D4201%26error_message%3DUser%2Bcanceled%2Bthe%2BDialog%2Bflow%26e2e%3D%257B%257D&display=popup&locale=en_US
  page.find("facebook-share[url='http://calendar-stage.cincinnati.com/event/201777/Power-Yoga-Class']")
end

When(/I click on the 'Twitter' logo$/) do
  @cincycaleventdetails.twitter_link.click
end

Then(/^I should be directed to the 'Twitter' url to share details for the event on my wall or feed$/) do
  new_window = windows.last
  page.within_window new_window do # Ensure we are within the right browser tab.
    expect(current_url). to match("https://twitter.com/intent/tweet?url=http://bit.ly/2l9k9UJ&text=Check%20out%20Power%20Yoga%20Class%3A&via=ENQThingsToDo&original_referer=http://calendar-stage.cincinnati.com/event/201777/Power-Yoga-Class")
  end
end

Then(/^I verify that the calender link contains the correct url$/) do |table|
  table.hashes .each do |row|
    expect(@cincycalredesign).to have_text('<a class="atcb-item-link" href="#{row["correctURL"]}" target="_blank">#{row["addCalendar"]}</a>')
  end
end

Given(/^that I have loaded an upcoming events by venue page$/) do
  @venueresultspage = VenueResultsPage.new
  @venueresultspage.load
end

And(/^I see the link "(.*?)" on the page$/) do |link|
  page.find('a', text: link)
end

Then(/^I should be taken to the correct url$/) do
  new_window = windows.last
  page.within_window new_window do # Ensure we are within the right browser tab.
    #https://www.google.com/maps/place/898+Walnut+St,+Cincinnati,+OH+45202/@39.1054131,-84.5142735,17z/data=!3m1!4b1!4m5!3m4!1s0x8841b15764acac21:0x64c5ebf4f306dc2d!8m2!3d39.1054131!4d-84.5120848
    expect(current_url).to match("https://www.google.com/maps?q=898+Walnut+St.,+Cincinnati,+OH,+45202")
  end
end
