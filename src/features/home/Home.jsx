import React from "react";
import PostsList from "../../components/postsList";
import { authorizeUser } from "../../services/redditAPI";


const Home = () => {

    return (
        <div>
            <button type="button" onClick={authorizeUser}>
                Authorize
            </button>
            <PostsList />
        </div>
    )
}

export default Home;