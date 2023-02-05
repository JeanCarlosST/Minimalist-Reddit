import React from "react";
import { useParams } from "react-router-dom";
import AboutSubreddit from "../../components/AboutSubreddit/AboutSubreddit";
import PostsList from "../../components/PostList/PostsList";
import { useGetSubredditAboutQuery } from "../../services/redditApi";
import DefaultIcon from '../../assets/svgs/default-subreddit-icon.svg'
import styles from './Subreddit.module.css';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const Subreddit = () => {
    const { name } = useParams();
    const { data, isFetching, error } = useGetSubredditAboutQuery(name);

    if(error)
        return <p>{error.message}</p>

    const about = data?.data ?? {};
    const title = about.title;
    const subreddit = about.display_name_prefixed;
    let image = about.icon_img;

    if(!image)
        image = DefaultIcon;

    return (
        <>
            <div className={styles.subredditBanner}>
                <div>
                    { !isFetching ? <img src={image} className={styles.subredditIcon}/> : <Skeleton width={50} height={50} borderRadius={25}/> }
                    <div className={styles.subredditNames}>
                        <h1>{ !isFetching ? title : <Skeleton width={100}/>}</h1>
                        <h2>{ !isFetching ? subreddit : <Skeleton height={20} width={50}/>}</h2>
                    </div>
                </div>
            </div>
            <div className={styles.subreddit}>
                <PostsList subreddit={name}/>
                { !isFetching && <AboutSubreddit name={about.display_name}/>}
            </div>
        </>
    )
}

export default Subreddit