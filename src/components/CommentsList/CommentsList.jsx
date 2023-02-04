import React from "react";
import Comment from "../Comment/Comment";
import styles from './CommentsList.module.css';

const CommentsList = ({ comments }) => {
    return (
        <>
            <hr/>
            {comments.filter(comment => comment.kind === "t1").map(comment => 
                <Comment comment={comment.data} key={comment.data.id}/>
            )}
        </>
    )
}

export default CommentsList