import React from "react";
import ReactMarkdown from 'react-markdown'
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import moment from "moment";
import styles from './Comment.module.css';
import { formatNumber } from "../../utils";
import DefaultAvatar from "../../assets/images/avatar_default.png";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const Comment = ({ comment, isFetching }) => {
    const author = comment.author;
    const timeElapsed = moment.unix(comment.created_utc).fromNow();
    const body = comment.body;
    const score = formatNumber(comment.score);
    const replies = comment.replies?.data?.children?.filter(c => c.kind === "t1");
    
    return (
        <div className={styles.commentContainer}>
            <div className={styles.commentHeader}>
                <img src={DefaultAvatar}/>
                { !isFetching ?
                    <>
                        <span className={styles.author}>{author}</span>
                    </> : <Skeleton width={80}/>
                }
                {" · "}
                <span className={styles.timeElapsed}>
                    { !isFetching ? timeElapsed : <Skeleton width={60} />}
                </span>
            </div>
            <div className={styles.commentBody}>
                <div className={styles.verticalLine} />
                <div className={styles.commentContent}>
                    <div className={styles.commentText}>
                        { !isFetching ? <ReactMarkdown children={body}/> : <Skeleton count={2} width={300}/>}
                    </div>
                    <div className={styles.commentVotesContainer}>
                        <button type="button" className={`${styles.voteButton} ${styles.upVote}`} disabled>
                            <FaArrowAltCircleUp/>
                        </button>
                        <p className={styles.score}>
                            { !isFetching ? score : <Skeleton width={30}/>}
                        </p>
                        <button type="button" className={`${styles.voteButton} ${styles.downVote}`} disabled>
                            <FaArrowAltCircleDown/>
                        </button>
                    </div>
                    { replies && replies.map(comment => 
                        <Comment comment={comment.data} key={comment.data.id}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Comment;