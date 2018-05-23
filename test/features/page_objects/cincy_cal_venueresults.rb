class VenueResultsPage < SitePrism::Page

  set_url "http://calendar-stage.cincinnati.com/venue/2667/YWCA"

  element :first_venue_link, 'a.cal-result-link', match: :first

end
