import React from "react";
import ReactMarkdown from 'react-markdown'
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import moment from "moment";
import styles from './Comment.module.css';
import { formatNumber } from "../../utils";
import DefaultAvatar from "../../assets/images/avatar_default.png";

const Comment = ({ comment }) => {
    const author = comment.author;
    const timeElapsed = moment.unix(comment.created_utc).fromNow();
    const body = comment.body;
    const score = formatNumber(comment.score);
    const replies = comment.replies?.data?.children?.filter(c => c.kind === "t1");
    
    return (
        <div className={styles.commentContainer}>
            <div className={styles.commentHeader}>
                <img src={DefaultAvatar}/>
                <span className={styles.author}>{author}</span>
                {" · "}
                <span className={styles.timeElapsed}>{timeElapsed}</span>
            </div>
            <div className={styles.commentBody}>
                <div className={styles.verticalLine} />
                <div className={styles.commentContent}>
                    <div className={styles.commentText}>
                        <ReactMarkdown children={body}/>
                    </div>
                    <div className={styles.commentVotesContainer}>
                        <button type="button" className={`${styles.voteButton} ${styles.upVote}`} disabled>
                            <FaArrowAltCircleUp/>
                        </button>
                        <p className={styles.score}>{score}</p>
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