require 'rspec'
require 'rspec/expectations'
require 'capybara'
require 'capybara/dsl'
require 'capybara/rspec'
require 'capybara/cucumber'
require 'rubygems'
require 'selenium-webdriver'
require 'sauce_whisk'
require 'parallel_tests'
require 'site_prism'
require 'require_all'

Capybara::DSL
Capybara::RSpecMatchers

begin
  require_all "#{File.join(File.expand_path(File.dirname(__FILE__)), '..', 'page_objects')}"
rescue
  puts "no page objects found"
end

Before do | scenario |
  # need to configure env variables for browser
  Capybara.default_max_wait_time = 60
  Capybara.default_selector = :css
  Capybara.current_driver = :selenium
  Capybara.javascript_driver = :selenium

  if ENV['LOCAL']
    # Execute selenium tests locally
    Capybara.default_driver = :selenium
    Capybara.register_driver :selenium do |app|
      profile = Selenium::WebDriver::Firefox::Profile.new
      profile.native_events = true
      Capybara::Selenium::Driver.new(app, :browser => :firefox, profile: profile)
    end
    #Capybara.current_session.driver.browser.manage.window.resize_to(1280,1024)
  elsif ENV['SAUCE_LABS']
    # need to configure env variables for browser
    capabilities = {
        :version => ENV['version'] || 46,
        :browserName => ENV['browserName'] || 'Firefox',
        :platform => ENV['platform'] || 'Windows 8.1',
        :seleniumVersion => ENV['seleniumVersion'] || '2.53.0',
        :screenResolution => '1280x1024',
        :name => "#{scenario.feature.name} - #{scenario.name}",
        :startTunnel => ENV['startTunnel'] || false
    }
    url = "http://#{ENV['SAUCE_USERNAME']}:#{ENV['SAUCE_ACCESS_KEY']}@ondemand.saucelabs.com:80/wd/hub".strip
    Capybara.register_driver :selenium do |app|
      Capybara::Selenium::Driver.new(app, :browser => :remote, :url => url, :desired_capabilities => capabilities)
    end
  else
    raise "Environment variable must be either: LOCAL or SAUCE_LABS"
  end
end

Around do | scenario, block |
  block.call
  jobname = "#{scenario.feature.name} - #{scenario.name}"
  if ENV['LOCAL']
    puts jobname
  else
    sessionid = ::Capybara.current_session.driver.browser.session_id
    puts "SauceOnDemandSessionID=#{sessionid} job-name=#{jobname}"
    job = SauceWhisk::Jobs.fetch sessionid
    job.name = jobname
    job.passed = scenario.passed? ? true : false
    job.save
  end
  ::Capybara.current_session.driver.quit
end


# "after all"
After do | scenario |
  Cucumber.wants_to_quit = true if scenario.failed?
end
