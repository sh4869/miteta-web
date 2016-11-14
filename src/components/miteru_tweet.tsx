/// <reference path="../../node_modules/@types/twitter/index.d.ts"/>
import * as React from "react";
import * as $script from "scriptjs";

export interface MiteruTweetInfo {
    url: string;
    title: string;
    tweet_url: string;
}

export default class MiteruTweet extends React.Component<MiteruTweetInfo, {}> {
    private tweet_element: HTMLElement;
    componentDidMount() {
        this.loadWidget();
    }

    componentDidUpdate() {
        this.loadWidget();
    }

    loadWidget() {
        $script.ready("twitter-widgets", () => {
            const tweet_id = this.props.tweet_url.replace("https://twitter.com/sh4869sh/status/", "").replace("https://twitter.com/statues/", "");
            window.twttr.widgets.createTweet(tweet_id, this.tweet_element).then(() => {
            });
        });
    }
    render() {
        return (
            <div>
                <a href={this.props.url}>
                    {(() => {
                        if (this.props.title) {
                            return <h3>{this.props.title}</h3>;
                        } else {
                            return <h3>{this.props.url}</h3>;
                        }
                    })()}
                </a>
                <div ref={(x) => this.tweet_element = x} />
            </div>
        );
    }
};
