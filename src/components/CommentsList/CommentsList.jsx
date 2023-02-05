import React from "react";
import Comment from "../Comment/Comment";
import styles from './CommentsList.module.css';

const CommentsList = ({ comments, isFetching }) => {

    if(isFetching) 
        return (
            <>
                <hr/>
                {[...Array(10)].map((comment, i) => 
                    <Comment comment={{}} isFetching={isFetching} key={i}/>
                )}
            </>
        )

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