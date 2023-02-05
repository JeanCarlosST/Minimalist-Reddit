import React from "react";
import SubredditResultItem from "../SubredditResultItem/SubredditResultItem";
import styles from "./SubredditResults.module.css";

const SubredditResults = ({results, isFetching}) => {
    
    if(isFetching)
        return (
            <div className={styles.subredditResults}>
                {[...Array(15)].map((subreddit, i) => 
                    <SubredditResultItem subreddit={{}} isFetching={isFetching} key={i}/>)}
            </div>
        )

    return (
        <div className={styles.subredditResults}>
            {results.map(subreddit => 
                <SubredditResultItem subreddit={subreddit.data} key={subreddit.data.id}/>)}
        </div>
    )
}

export default SubredditResults;