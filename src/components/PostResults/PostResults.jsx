import React from "react";
import PostResultItem from "../PostResultItem/PostResultItem";
import styles from './PostResults.module.css';

const PostResults = ({results, isFetching}) => {
    
    if(isFetching) {
        return (
            <div className={styles.postResults}>
                {[...Array(25)].map((post, i) =>
                    <PostResultItem post={{}} isFetching={isFetching} key={i}/>
                )}
            </div>
        );
    }

    return (
        <div className={styles.postResults}>
            {results.map(post =>
                <PostResultItem post={post.data} key={post.data.id}/>)}
        </div>
    );
}

export default PostResults;