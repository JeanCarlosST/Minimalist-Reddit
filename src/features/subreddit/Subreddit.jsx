import React from "react";
import { useParams } from "react-router-dom";
import AboutSubreddit from "../../components/AboutSubreddit/AboutSubreddit";
import PostsList from "../../components/PostList/PostsList";
import { useGetSubredditAboutQuery } from "../../services/redditApi";
import DefaultIcon from '../../assets/svgs/default-subreddit-icon.svg'
import styles from './Subreddit.module.css';

const Subreddit = () => {
    const { name } = useParams();
    const { data, isFetching, error } = useGetSubredditAboutQuery(name);

    if(isFetching)
        return <p>Loading...</p>
    
    if(error)
        return <p>{error.message}</p>

    const about = data.data;
    const title = about.title;
    const subreddit = about.display_name_prefixed;
    let image = about.icon_img;

    if(!image)
        image = DefaultIcon;

    return (
        <>
            <div className={styles.subredditBanner}>
                <div>
                    <img src={image} className={styles.subredditIcon}/>
                    <div className={styles.subredditNames}>
                        <h1>{title}</h1>
                        <h2>{subreddit}</h2>
                    </div>
                </div>
            </div>
            <div className={styles.subreddit}>
                <PostsList subreddit={name}/>
                <AboutSubreddit name={about.display_name}/>
            </div>
        </>
    )
}

export default Subreddit