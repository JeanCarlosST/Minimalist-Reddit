import React from "react"
import { Link } from "react-router-dom";
import DefaultIcon from '../../assets/svgs/default-subreddit-icon.svg'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './SubredditLink.module.css';

const SubredditLink = ({subreddit}) => {
    const data = subreddit.data ?? {};
    const name = data.display_name_prefixed;
    let image = data.icon_img;

    if(!image)
        image = DefaultIcon;

    return (
        <Link to={name || ""} className={styles.subredditLink}>
            {name ? <img src={image}/> : <Skeleton height={40} width={40} borderRadius={20} />}
            <span>{name || <Skeleton width={100}/>}</span>
        </Link>
    )
}

export default SubredditLink