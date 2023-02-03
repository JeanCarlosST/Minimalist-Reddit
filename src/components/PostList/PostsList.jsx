import React from "react"
import PostItem from "../PostItem/PostItem";
import { useGetMainContentQuery } from "../../services/redditApi";
import styles from "./PostList.module.css"

const PostsList = () => {
    const { data, isFetching, error } = useGetMainContentQuery();
    
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