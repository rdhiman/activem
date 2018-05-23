class FilterResultsAgain < SitePrism::Page

  set_url 'http://calendar-stage.cincinnati.com/?pageIndex=1&superCatIds=13,3&location=Downtown'

  element :within_ptag, '#cal-more-filters'
  element :filters_badge, 'span.cal-filters-badge'

end
