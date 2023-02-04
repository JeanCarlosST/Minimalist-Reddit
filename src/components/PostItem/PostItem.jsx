import React from "react"
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleUp, FaArrowAltCircleDown, FaRegComments } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utils";
import ReactMarkdown from 'react-markdown'
import styles from "./PostItem.module.css";
import moment from "moment";
import CommentsList from "../CommentsList/CommentsList";

const PostItem = ({ post, comments, isCurrentPost }) => {
    const { data } = post;
    const title = data.title;
    const postHint = data.post_hint;
    const score = formatNumber(data.score);
    const subreddit = data.subreddit_name_prefixed;
    const postedBy = data.author;
    const timeElapsed = moment.unix(data.created_utc).fromNow();
    const numComments = formatNumber(data.num_comments);
    const postLink = `/${subreddit}/comments/${data.id}`;
    const isVideo = data.is_video;
    const source = isVideo ? data.media.reddit_video.fallback_url : data.url;
    const isImage = postHint === "image";
    const isLink = postHint === "link";
    const thumbnail = data.thumbnail;
    const selfText = data.selftext;
    const navigate = useNavigate();

    const handlePostClick = () => {
        navigate(postLink)
    }
    
    return (
        <div className={styles.postItem}>
            <div className={styles.postSection}>
                <div className={styles.postVotesContainer}>
                    <button type="button" className={`${styles.voteButton} ${styles.upVote}`}>
                        <FaArrowAltCircleUp/>
                    </button>
                    <p>{score}</p>
                    <button type="button" className={`${styles.voteButton} ${styles.downVote}`}>
                        <FaArrowAltCircleDown/>
                    </button>
                </div>
                <div className={styles.postContentContainer}>
                    <div onClick={handlePostClick}>
                        <div className={styles.postContentHeader}>
                            <h4>{title}</h4> 
                            {isLink && <img src={thumbnail} className={styles.thumbnail}/>}
                        </div>
                        { isVideo && <video src={source} className={styles.postMedia} autoPlay muted controls></video> }
                        { isImage && <img src={source} className={styles.postMedia}/>}
                        { isLink && <a href={source} className={styles.externalLink}>External link</a>}   
                        { isCurrentPost && <ReactMarkdown children={selfText} />}                 
                    </div>
                    <div className={styles.postInfo}>
                        <p>
                            <Link to={subreddit} className={styles.subredditLink}>{subreddit}</Link>
                            {" · "} 
                            <span className={styles.postedBy}>Posted by {postedBy}</span>
                        </p>
                        <p className={styles.timeElapsed}>
                            {timeElapsed}
                        </p>
                        <p className={styles.numComments}>
                            <FaRegComments/>
                            <span>{numComments}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.commentsSection}>
                {comments && <CommentsList comments={comments}/>}
            </div>
        </div>
    )
}

export default PostItem;