import React from "react"
import { Link } from "react-router-dom";
import styles from './SubredditLink.module.css';
import DefaultIcon from '../../assets/svgs/default-subreddit-icon.svg'

const SubredditLink = ({subreddit}) => {
    const { data } = subreddit;
    const name = data.display_name_prefixed;
    let image = data.icon_img;

    if(!image)
        image = DefaultIcon;

    return (
        <Link to={name} className={styles.subredditLink}>
            <img src={image}/>
            <span>{name}</span>
        </Link>
    )
}

export default SubredditLink