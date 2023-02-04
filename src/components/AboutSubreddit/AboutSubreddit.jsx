import React from "react";
import { useGetSubredditAboutQuery } from '../../services/redditApi';
import styles from './AboutSubreddit.module.css';
import {formatNumber} from '../../utils'
import DefaultIcon from '../../assets/svgs/default-subreddit-icon.svg'
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

const AboutSubreddit = ({ name, isInPost }) => {
    const { data, isFetching, error } = useGetSubredditAboutQuery(name);
    const navigate = useNavigate();

    if(isFetching)
        return <p>Loading...</p>
    
    if(error)
        return <p>{error.message}</p>
    
    const about = data.data
    const prefixedName = about.display_name_prefixed;
    const description = about.public_description 
        ? about.public_description
        : `Welcome to ${about.title}`;

    const subscribers = formatNumber(about.subscribers);
    const dateCreated = moment.unix(about.created_utc).format("MMM D, YYYY");
    const active = formatNumber(about.accounts_active);
    let image = about.icon_img;

    if(!image)
        image = DefaultIcon;

    const handleSubredditClick = () => {
        navigate(`/${prefixedName}`);
    }

    return (
        <div className={styles.about}>
            { isInPost 
                ?  <button type="button" className={styles.subredditButton} onClick={handleSubredditClick}>
                        <img src={image}/>
                        <span>{prefixedName}</span>
                    </button>
                : <h3>About this subreddit</h3>
            }
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