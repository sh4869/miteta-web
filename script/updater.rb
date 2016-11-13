require 'forever'
require_relative 'miteru_tweet_checker.rb'
require_relative 'git_updater.rb'

Forever.run do
  every 5.minutes do 
    puts "start"
    increments_tweet = MiteruTweetChecker.check
    if increments_tweet
      GitUpdater.update_repository
    end
  end
end
