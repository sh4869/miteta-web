/// <reference path="../../node_modules/@types/twitter/index.d.ts"/>
import * as React from "react";
import * as $script from "scriptjs";
import { Link } from "react-router";

export interface MiteruTweetInfo {
    url?: string;
    title?: string;
    tweet_url?: string;
    params?: {
        url: string;
        title?: string;
        tweet_url: string;
    };
}

export default class MiteruTweet extends React.Component<MiteruTweetInfo, {}> {
    private tweet_element: HTMLElement;
    private tweet_url: string;
    private url: string;
    private title: string;
    private rendered: boolean;
    private style: React.CSSProperties = {
        title: {
            textDecoration: "none"
        },
        container: {
            "padding": "3px",
            "paddingLeft": "3em",
            "position": "relative",
            "textAlign": "center",
            tweet: {
                "margin": "0 auto"
            }
        }
    }
    constructor() {
        super();
        this.rendered = false;
    }
    componentDidMount() {
        this.loadWidget();
    }

    componentDidUpdate() {
        this.loadWidget();
    }

    loadWidget() {
        if (!this.rendered) {
            $script.ready("twitter-widgets", () => {
                this.rendered = true;
                const tweet_id = this.tweet_url.replace("https://twitter.com/sh4869sh/status/", "").replace("https://twitter.com/statues/", "");
                window.twttr.widgets.createTweet(tweet_id, this.tweet_element, { align: "center" }).then(() => {
                });
            });
        }
    }
    render() {
        if (this.props.tweet_url) {
            this.tweet_url = this.props.tweet_url;
            this.url = this.props.url;
            this.title = this.props.title;
        } else {
            this.tweet_url = decodeURI(this.props.params.tweet_url);
            this.url = decodeURI(this.props.params.url);
            this.title = this.props.params.title ? decodeURI(this.props.params.title) : "";
        }
        return (
            <div className={"w-70-l w-90-ns center pa3"}>
                <a href={this.url} style={this.style.title}>
                    {(() => {
                        if (this.title) {
                            return (
                                <div className={"f4 blue"} style={this.style.title}>
                                    {this.title}
                                </div>
                            );
                        } else {
                            return (
                                <div className={"f4 blue"} style={this.style.title}>
                                    {this.url}
                                </div>
                            );
                        }
                    })()}
                </a>
                <Link to={"/tweet/" + encodeURIComponent(this.tweet_url) + "/" + encodeURIComponent(this.url) + "/" + encodeURIComponent(this.title)}>
                    <div style={this.style.container}>
                        <div ref={(x) => this.tweet_element = x} style={this.style.container.tweet} />
                    </div>
                </Link>
            </div>

        );
    }
};
