require 'git'

class GitUpdater
  def self.update_repository
    puts Dir.pwd
    g = Git.open(Dir.pwd)
    if g.current_branch == "tweet-data"
      time = Time.now
      begin 
        g.commit_all("AUTOMATIC UPDATE")
        g.push(branch: "tweet-data")
      rescue
        puts "Commit Failed"
      end
    end
  end
end

