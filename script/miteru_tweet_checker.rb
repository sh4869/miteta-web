require 'twitter'
require_relative 'keys.rb'
require 'open-uri'

class MiteruTweetChecker
  def self.check
    file = File.open('miteru_tweet.json')
    miteru_tweet_data = JSON.parse(file.read)
    file.close
    old_length = miteru_tweet_data.length
    rest_client = Twitter::REST::Client.new do |config|
      config.consumer_key = CONSUMER_KEY
      config.consumer_secret = CONSUMER_SECRET
      config.access_token = ACCESS_TOKEN
      config.access_token_secret = ACCESS_TOKEN_SECRET
    end
    rest_client.user_timeline(USER_NAME,options = {:count => 200}).reverse_each do |tweet|
      if tweet.hashtags.select{|tag| tag.text == "miteru" }.length > 0
        page_url = tweet.uris.last.expanded_uri.to_s
        begin 
          title = OpenURI.open_uri(page_url).read.scan(/<title>(.*?)<\/title>/)[0][0] 
        rescue => e
          title = ""
        end
        tweet_url = tweet.uri.to_s
        tweet_data = {"url" => page_url,"title" => title, "tweet_url" => tweet_url}
        miteru_tweet_data.unshift(tweet_data)
      end
    end
    # 重複を削除
    miteru_tweet_data.uniq!
    if miteru_tweet_data.length > old_length
      file = File.open("miteru_tweet.json","w")
      file.write(JSON.pretty_generate(miteru_tweet_data) + "\n")
      file.close
      return true
    else
      return false
    end
  end 
end

