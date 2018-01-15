require 'open-uri'
require 'csv'
require 'json'

csv_data = CSV.read('tweets.csv',encoding:"UTF-8:UTF-8")

miteru_datas = []
csv_data.each do |tweet|
  text = tweet[5]
  if !text.to_s.start_with?("RT") && text.to_s.include?("#miteru")
    page_url = tweet[9].split(",").last
    begin 
      title = OpenURI.open_uri(page_url).read.scan(/<title>(.*?)<\/title>/)[0][0].force_encoding("UTF-8")
    rescue  => e
      title = ""
    end
    tweet_url = "https://twitter.com/statues/" + tweet[0].to_s
    tweet_data = {"url" => page_url,"title" => title, "tweet_url" => tweet_url}
    begin 
      puts tweet_data.to_json
      miteru_datas.push(tweet_data)
    rescue => e
      puts e
    end
  end
end

puts miteru_datas.to_json
open("miteru_tweet.json","w") do |io|
  JSON.dump(miteru_datas,io)
end
