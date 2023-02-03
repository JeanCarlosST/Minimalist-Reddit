import React from "react"
import SubredditLink from '../SubredditLink/SubredditLink'
import { useGetPopularSubredditsQuery } from '../../services/redditApi'
import styles from './PopularSubredditsList.module.css';

const PopularSubredditsList = () => {
    const { data, isFetching, error } = useGetPopularSubredditsQuery();
    
    if(isFetching)
        return <p>Loading...</p>
    
    if(error)
        return <p>{error.message}</p>

    const subreddits = data.data.children;

    return (
        <div className={styles.subredditsList}>
            <h3>Popular Subreddits</h3>
            {subreddits.map(subreddit => 
                <SubredditLink subreddit={subreddit} key={subreddit.data.id}/>
            )}
        </div>
    )
}

export default PopularSubredditsList;