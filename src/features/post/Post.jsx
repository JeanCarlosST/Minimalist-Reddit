import React from "react"
import { useParams } from "react-router-dom";
import AboutSubreddit from "../../components/AboutSubreddit/AboutSubreddit";
import PostItem from "../../components/PostItem/PostItem";
import { useGetPostWithCommentsQuery, useGetSubredditAboutQuery } from "../../services/redditApi";
import styles from './Post.module.css';

const Post = () => {
    const { subreddit, postId } = useParams();
    const { data, isFetching, error } = useGetPostWithCommentsQuery({subreddit, postId});

    if(error)
        return <p>{error.message}</p>

    const post = !isFetching ? data[0].data.children[0] : {};
    const comments = !isFetching ? data[1].data.children : {};

    return (
        <div className={styles.post}>
            <div className={styles.postItemContainer}>
                <PostItem post={post} comments={comments} isCurrentPost={true} isFetching={isFetching}/>
            </div>
            { !isFetching && <AboutSubreddit name={post.data?.subreddit} isInPost={true}/>}
        </div>
    );
}

export default Post;