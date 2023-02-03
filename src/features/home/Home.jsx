import React from "react";
import PopularSubredditsList from "../../components/PopularSubredditsList/PopularSubredditsList";
import PostsList from "../../components/PostList/PostsList";
import styles from "./Home.module.css"

const Home = () => {

    return (
        <div className={styles.home}>
            <PostsList />
            <PopularSubredditsList />
        </div>
    )
}

export default Home;