import React from "react";
import SubredditResultItem from "../SubredditResultItem/SubredditResultItem";
import styles from "./SubredditResults.module.css";

const SubredditResults = ({results}) => {
    
    return (
        <div className={styles.subredditResults}>
            {results.map(subreddit => 
                <SubredditResultItem subreddit={subreddit.data} key={subreddit.data.id}/>)}
        </div>
    )
}

export default SubredditResults;