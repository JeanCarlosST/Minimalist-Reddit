import React from "react"
import PostItem from "../PostItem/PostItem";
import { useGetMainContentQuery, useGetSubredditPostsQuery } from "../../services/redditApi";
import styles from "./PostList.module.css"

const PostsList = ({ subreddit }) => {
    let data = {};
    let isFetching = false;
    let error;
    let query;

    if(subreddit) 
        query = useGetSubredditPostsQuery(subreddit);
    else 
        query = useGetMainContentQuery();
    
    data = query.data;
    isFetching = query.isFetching;
    error = query.error
    
    if(isFetching)
        return <p>Loading...</p>
    
    if(error)
        return <p>{error.message}</p>

    const posts = data.data.children;

    return (
        <div className={styles.postList}>
            {posts.map(post => <PostItem post={post} key={post.data.id}/>)}
        </div>
    )
}

export default PostsList;