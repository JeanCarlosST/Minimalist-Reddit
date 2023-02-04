import React from "react";
import moment from "moment";
import { formatNumber } from "../../utils";
import styles from './PostResultItem.module.css';
import { FaRegComments } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const PostResultItem = ({post}) => {
    const title = post.title;
    const upvotes = formatNumber(post.ups);
    const subreddit = post.subreddit_name_prefixed;
    const postedBy = post.author;
    const timeElapsed = moment.unix(post.created_utc).fromNow();
    const numComments = formatNumber(post.num_comments);
    const postLink = `/${subreddit}/comments/${post.id}`;
    const thumbnail = post.thumbnail;
    const showThumbnail = thumbnail !== "image" && thumbnail !== "self" && thumbnail !== "default";
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(postLink);
    }

    return (
        <div className={styles.postResultItem} onClick={handleClick}>
            <div className={styles.itemHeader}>
                <Link to={subreddit} className={styles.subredditLink}>{subreddit}</Link>            
            </div>
            <div className={styles.itemBody}>
                <h4>{title}</h4>
                {showThumbnail && <img src={thumbnail}/>}
            </div>
            <div className={styles.itemFooter}>
                <p>
                    <span className={styles.postedBy}>
                        Posted by {postedBy}
                    </span>
                    {" · "}
                    <span className={styles.timeElapsed}>
                        {timeElapsed}
                    </span>
                </p>
                <p>
                    {upvotes} upvotes
                </p>
                <p className={styles.numComments}>
                    <FaRegComments/>
                    <span>{numComments}</span>
                </p>
            </div>
        </div>
    )
}

export default PostResultItem;