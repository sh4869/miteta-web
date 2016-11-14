import * as React from "react";
import MiteruTweetsPage from "./miteru_tweets_page";
interface HomeProps {
    children: React.ReactNode;
}

const Home: React.SFC<HomeProps> = (props: HomeProps) => {
    return (
        <div>
            <h1>sh4869 Miteru Page</h1>
            {props.children || <MiteruTweetsPage />}
        </div>
    )
}
export default Home;
