import * as React from "react";
import { Link } from "react-router";
import MiteruTweetsPage from "./miteru_tweets_page";
interface HomeProps {
    children: React.ReactNode;
}

const homestyle = {
    title: {
        textAlign: "center",
        link: {
            textDecoration: "none",
        },
        text: {
            fontWeight: 300,
            color: "black"
        }
    },
    head: {
        paddingTop: "3em",
        paddingBottom: "3em",
        textAlign: "center",
        text: {
            fontWeight: 300,
        }
    }
};
const Home: React.SFC<HomeProps> = (props: HomeProps) => {
    return (
        <div>
            <div style={homestyle.title}>
                <Link to="/" style={homestyle.title.link}>
                    <h1 style={homestyle.title.text}>sh4869 Miteru Page</h1>
                </Link>
            </div>
            {props.children || <MiteruTweetsPage />}
            <div style={homestyle.head}>
                <h4>&copy;2016 sh4869 All Right reserved</h4>
            </div>
        </div>
    );
};

export default Home;
