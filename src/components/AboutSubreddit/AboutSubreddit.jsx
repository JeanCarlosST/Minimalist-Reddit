import React from "react";
import { useGetSubredditAboutQuery } from '../../services/redditApi';
import {formatNumber} from '../../utils'
import DefaultIcon from '../../assets/svgs/default-subreddit-icon.svg'
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './AboutSubreddit.module.css';

const AboutSubreddit = ({ name, isInPost }) => {
    const { data, isFetching, error } = useGetSubredditAboutQuery(name);
    const navigate = useNavigate();
    
    if(error)
        return <p>{error.message}</p>
    
    const about = data?.data ?? {};
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
                        { !isFetching ? <img src={image}/> : <Skeleton width={40} height={40} borderRadius={20}/>}
                        <span>{!isFetching ? prefixedName : <Skeleton width={100}/>}</span>
                    </button>
                : <h3>About this subreddit</h3>
            }
            <p className={styles.description}>{!isFetching ? description : <Skeleton/>}</p>
            <hr/>
            <p className={styles.dateCreated}>{!isFetching ? `Created ${dateCreated}` : <Skeleton/>}</p>
            <hr/>
            <div className={styles.subscribersInfo}>
                <div className={styles.subscribers}>
                    <span>{!isFetching ? subscribers : <Skeleton width={30}/>}</span>
                    <span>Subscribers</span>
                </div>
                <div className={styles.active}>
                    <span>{!isFetching ? active : <Skeleton width={30}/>}</span>
                    <span>Online</span>
                </div>
            </div>
        </div>
    )
}

export default AboutSubreddit