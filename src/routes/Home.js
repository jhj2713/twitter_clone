import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Tweet from "../components/Tweet";
import TweetFac from "components/TweetFac";

const Home = ({ userObj }) => {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        dbService.collection("tweets").orderBy("createdAt", "desc").onSnapshot(snapshot => {
            const tweetArr = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArr);
        })
    }, []);
    
    return(
        <div className="container">
            <TweetFac userObj={userObj}/>
            <div style={{ marginTop: 30 }}>
                {tweets.map(tweet => <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.createdId === userObj.uid}/>)}
            </div>
        </div>
    )
}
export default Home;