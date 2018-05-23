class CincyCalRedesign < SitePrism::Page
  
  set_url 'http://calendar-stage.cincinnati.com/'

  element :enter_start_date, '#cal-date-start'
  element :enter_end_date, '#cal-date-end'
  element :search_button, '.cal-desktop input.cal-button'  
  element :filter_heading, '.cal-heading.cal-filter-heading.cal-heading-date'

  element :filter_heading, '.cal-heading.cal-filter-heading.cal-heading-date'
  element :result_message, '.cal-results-heading.ng-binding'

  element :events_found, '.cal-results-heading'
  element :more_filters, '.cal-more-filters'
  element :dining_filter, '.ng-binding.ng-scope'

  element :first_event_link, 'a.cal-result-link', match: :first
  element :event_date_on_the_page, 'p.cal-listing-item.cal-event-date'
  element :pagination_link, '.pagination-page'

  element :cal_category, '.cal-cat'
  element :cal_heading, '.cal-heading.cal-result-title'

  element :cal_sub_label, 'span.cal-sub-label.ng-binding'

  element :enter_location, '#cal-loc-1'

end
