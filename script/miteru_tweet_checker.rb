require 'twitter'
require_relative 'keys.rb'
require 'open-uri'

class MiteruTweetChecker
	def self.check
		file = File.open('miteru_tweet.json')
		miteru_tweet_data = JSON.parse(file.read)
		old_data = miteru_tweet_data
		file.close
		old_length = miteru_tweet_data.length
		puts "Start Collecting Tweet"
		rest_client = Twitter::REST::Client.new do |config|
			config.consumer_key = CONSUMER_KEY
			config.consumer_secret = CONSUMER_SECRET
			config.access_token = ACCESS_TOKEN
			config.access_token_secret = ACCESS_TOKEN_SECRET
		end
		begin 
			rest_client.user_timeline(USER_NAME,options = {:count => 200}).reverse_each do |tweet|
				if tweet.hashtags.select{|tag| tag.text == "miteru" }.length > 0
					# get url,title,tweet_url
					page_url = tweet.uris.last.expanded_uri.to_s
					begin 
						title = OpenURI.open_uri(page_url).read.scan(/<title>(.*?)<\/title>/)[0][0].encode("UTF-8",invalid: :replace,undef: :replace) 
					rescue => e
						title = ""
					end
					tweet_url = tweet.uri.to_s
					tweet_data = {"url" => page_url,"title" => title, "tweet_url" => tweet_url}
					# 過去のものを確認
					back_data = miteru_tweet_data.select { |tweet|
						tweet["url"] == page_url 
					}
					if back_data.length > 0
						if back_data[0]["title"] == ""
							back_data[0]["title"] = title   
						end
					else
						miteru_tweet_data.unshift(tweet_data)
					end
				end
			end
		rescue => error
			puts error
		end
		# 重複を削除
		miteru_tweet_data.uniq!{|data| data["tweet_url"]}
		if miteru_tweet_data.length != old_length
			file = File.open("miteru_tweet.json","w")
			begin
				data = JSON.pretty_generate(miteru_tweet_data)
				file.write(data)
				puts "File Updated"
			rescue 
				file.write(JSON.pretty_generate(old_data))
			ensure
				file.close
			end
			return true
		else
			return false
		end
	end 
end
