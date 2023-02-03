import React from "react";
import PostsList from "../../components/PostList/PostsList";
import styles from "./Home.module.css"

const Home = () => {

    return (
        <div className={styles.home}>
            <PostsList />
        </div>
    )
}

export default Home;