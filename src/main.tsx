import * as React from "react";
import * as ReactDOM from "react-dom";
import MiteruTweet from "./components/miteru_tweet";
import MiteruTweetsPage from "./components/miteru_tweets_page";
import * as $script from "scriptjs";

$script("//platform.twitter.com/widgets.js", "twitter-widgets");


ReactDOM.render(
    <div>
        <h1>Hello,World</h1>
        <MiteruTweetsPage />
    </div>,
    document.getElementById("app")
);
