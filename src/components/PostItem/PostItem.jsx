import React from "react"
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleUp, FaArrowAltCircleDown, FaRegComments } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utils";
import ReactMarkdown from 'react-markdown'
import moment from "moment";
import CommentsList from "../CommentsList/CommentsList";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from "./PostItem.module.css";

const PostItem = ({ post, comments, isCurrentPost, isFetching }) => {
    const data = post.data ?? {};
    const title = data.title;
    const postHint = data.post_hint;
    const score = data.score ? formatNumber(data.score) : undefined;
    const subreddit = data.subreddit_name_prefixed;
    const postedBy = data.author;
    const timeElapsed = data.created_utc ? moment.unix(data.created_utc).fromNow() : undefined;
    const numComments = data.num_comments ? formatNumber(data.num_comments) : undefined;
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
                    <button type="button" className={`${styles.voteButton} ${styles.upVote}`} disabled>
                        <FaArrowAltCircleUp/>
                    </button>
                    <p>{ !isFetching ? score : <Skeleton width={20}/>}</p>
                    <button type="button" className={`${styles.voteButton} ${styles.downVote}`} disabled>
                        <FaArrowAltCircleDown/>
                    </button>
                </div>
                <div className={styles.postContentContainer}>
                    <div onClick={handlePostClick}>
                        <div className={styles.postContentHeader}>
                            <h4>{ !isFetching ? title : <Skeleton width={200}/>}</h4> 
                            {isLink && <img src={thumbnail} className={styles.thumbnail}/>}
                        </div>
                        { !isFetching ?
                            <>
                                { isVideo && <video src={source} className={styles.postMedia} autoPlay muted controls></video> }
                                { isImage && <img src={source} className={styles.postMedia}/>}
                                { isLink && <a href={source} className={styles.externalLink}>External link</a>}   
                                { isCurrentPost && <ReactMarkdown children={selfText} />}                 
                            </> : <Skeleton height={400}/>
                        }
                    </div>
                    <div className={styles.postInfo}>
                        <p>
                            { !isFetching ?
                                <>
                                    <Link to={`/${subreddit}`} className={styles.subredditLink}>{subreddit}</Link>
                                    {" · "} 
                                    <span className={styles.postedBy}>Posted by {postedBy}</span>
                                </> : <Skeleton width={120}/>
                            }
                        </p>
                        <p className={styles.timeElapsed}>
                            { !isFetching ? timeElapsed : <Skeleton width={50}/>}
                        </p>
                        <p className={styles.numComments}>
                            <FaRegComments/>
                            <span>{ !isFetching ? numComments : <Skeleton width={25}/>}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.commentsSection}>
                {comments && <CommentsList comments={comments} isFetching={isFetching}/>}
            </div>
        </div>
    )
}

export default PostItem;