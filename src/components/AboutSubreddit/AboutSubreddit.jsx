import React from "react";
import { useGetSubredditAboutQuery } from '../../services/redditApi';
import styles from './AboutSubreddit.module.css';
import {formatNumber} from '../../utils'
import moment from "moment";

const AboutSubreddit = ({ data, isFetching, error }) => {

    if(isFetching)
        return <p>Loading...</p>
    
    if(error)
        return <p>{error.message}</p>
    
    const description = data.public_description 
        ? data.public_description
        : `Welcome to ${data.title}`;

    const subscribers = formatNumber(data.subscribers);
    const dateCreated = moment.unix(data.created_utc).format("MMM D, YYYY");
    const active = formatNumber(data.accounts_active);

    return (
        <div className={styles.about}>
            <h3>About this subreddit</h3>
            <p className={styles.description}>{description}</p>
            <hr/>
            <p className={styles.dateCreated}>Created {dateCreated}</p>
            <hr/>
            <div className={styles.subscribersInfo}>
                <div className={styles.subscribers}>
                    <span>{subscribers}</span>
                    <span>Subscribers</span>
                </div>
                <div className={styles.active}>
                    <span>{active}</span>
                    <span>Online</span>
                </div>
            </div>
        </div>
    )
}

export default AboutSubreddit