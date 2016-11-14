require 'git'

class GitUpdater
  def self.update_repository
    puts Dir.pwd
    g = Git.open(Dir.pwd)
    if g.current_branch == "tweet-data"
      time = Time.now
      begin 
        g.commit_all("[ci skip] AUTOMATIC UPDATE")
        g.push("origin","tweet-data")
      rescue
        puts "Commit Failed"
      end
    end
  end
end

