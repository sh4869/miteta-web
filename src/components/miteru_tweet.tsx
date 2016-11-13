/// <reference path="../../node_modules/@types/twitter/index.d.ts"/>
import * as React from "react";

export interface MiteruTweetInfo {
    url: string;
    title: string;
    tweet_url: string;
}

const embedded_tweet_html = (tweet_url) => {
    return "<blockquote class=\"twitter-tweet\" data-lang=\"ja\"><a href=\"" + tweet_url + "\">Tweet Link</a></blockquote>";
};

const MiteruTweet: React.SFC<MiteruTweetInfo> = (props: MiteruTweetInfo) => {
    return (
        <div>
            <a href={props.url}>
                {(() => {
                    if (props.title) {
                        return <h3>{props.title}</h3>;
                    } else {
                        return <h3>{props.url}</h3>;
                    }
                })()}
            </a>
            <div dangerouslySetInnerHTML={{ __html: embedded_tweet_html(props.tweet_url) }} />
        </div>
    );
};

export default MiteruTweet;