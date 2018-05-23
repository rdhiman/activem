class CincyCalEventDetails < SitePrism::Page

  set_url "http://calendar-stage.cincinnati.com/event/201777/Power-Yoga-Class"

  element :facebook_link, 'a.cal-share-fb'
  element :twitter_link, 'a.cal-share-tw'

end
