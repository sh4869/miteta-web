import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import MiteruTweet from "./components/miteru_tweet";

import Home from "./components/home";
import * as $script from "scriptjs";

$script("//platform.twitter.com/widgets.js", "twitter-widgets");



ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Home}>
            <Route path="/tweet/:tweet_url/:url/(:title)" component={MiteruTweet}/>
        </Route>
    </Router>,
    document.getElementById("app")
);
