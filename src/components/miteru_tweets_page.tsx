/// <reference path="../../node_modules/@types/twitter/index.d.ts"/>
import * as React from "react";
import MiteruTweet, { MiteruTweetInfo } from "./miteru_tweet";
import "whatwg-fetch";

declare global {
    interface Window {
        twttr: Twitter;
    }
}

const data_url = "https://raw.githubusercontent.com/sh4869/miteta-web/tweet-data/miteru_tweet.json";

interface MiteruTweetsPageProps {

}
interface MiteruTweetsPageState {
    miteru_tweets: MiteruTweetInfo[];
    current_index: number;
}

export default class MiteruTweetsPage extends React.Component<MiteruTweetsPageProps, MiteruTweetsPageState> {
    private default_loadnumber: number = 10;
    private miteru_tweet_components = [];
    state = {
        miteru_tweets: [],
        current_index: 0
    };
    style = {
        border: {
            borderColor: "rgba(0, 68, 158, 0.47)"
        },
        load_button_zone: {
            "padding": "2em",
            load_button: {
                "float": "right"
            }
        }
    };

    componentDidMount() {
        fetch(data_url).then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({ miteru_tweets: json as MiteruTweetInfo[] } as MiteruTweetsPageState);
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (window.twttr) {
            window.twttr.widgets.load(
                document.getElementById("app")
            );
        }
    }
    onLoadButtonClick() {
        this.setState({ current_index: this.state.current_index + 10 } as MiteruTweetsPageState);
    }
    render() {
        if (this.state.miteru_tweets.length > 0) {
            for (let i = this.state.current_index; i < this.state.current_index + this.default_loadnumber; i++) {
                const miteru_tweet = this.state.miteru_tweets[i];
                this.miteru_tweet_components.push(
                    (
                        <div className={"bb"} style={this.style.border}>
                            <MiteruTweet
                                title={miteru_tweet.title}
                                url={miteru_tweet.url}
                                tweet_url={miteru_tweet.tweet_url}
                                key={i}
                                />
                        </div>
                    )
                );
            }
        }
        return (
            <div>
                {this.miteru_tweet_components}
                <div className={"mw5 mw7-ns center pa3 ph5-ns"} style={this.style.load_button_zone}>
                    <a className="f6 link dim br2 ba ph3 pv2 mb2 dib black" style={this.style.load_button_zone.load_button}>
                        <div onClick={this.onLoadButtonClick.bind(this)} className={"f4"}>
                            <div className={"center"}>
                                Load More
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}