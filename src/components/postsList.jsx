import React from "react"
import PostItem from "./postItem";
import { useGetMainContentQuery } from "../services/redditApi";

const PostsList = () => {
    const { data, isFetching, error } = useGetMainContentQuery();
    
    if(isFetching)
        return <p>Loading...</p>
    
    if(error)
        return <p>{error.message}</p>

    const posts = data.data.children;

    return (
        <div className="postList">
            {posts.map(post => <PostItem post={post} key={post.data.id}/>)}
        </div>
    )
}

export default PostsList;