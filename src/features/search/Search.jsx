import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetSearchQuery } from "../../services/redditApi";
import PostResults from "../../components/PostResults/PostResults";
import styles from "./Search.module.css";
import SubredditResults from "../../components/SubredditResults/SubredditResults";

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const term = searchParams.get("term");
    const typeParam = searchParams.get("type") ?? "link";

    const [type, setType] = useState(typeParam);
    const { data, isFetching, error } = useGetSearchQuery({term, type})
    
    if(error) {
        return <p>{error.error}</p>
    }

    const results = data?.data.children;
    const showPosts = type === "link";
    const postsButtonStyle = showPosts ? styles.selected : "";
    const subredditsButtonStyle = !showPosts ? styles.selected : "";

    const handleFilterButtonClick = (e) => {
        let newType = "";

        if(e.target.id === "posts" && type !== "link")
        {
            newType = "link"
            setType(newType);
        }
        
        else if(e.target.id === "subreddits" && type !== "sr")
        {
            newType = "sr";
            setType(newType);
        }

        const params = new URLSearchParams({
            term: term,
            type: newType
        });

        setSearchParams(params);
    }

    return (
        <div className={styles.search}>
            <div className={styles.filterButtons}>
                <button 
                    id="posts"
                    type="button" 
                    className={`${styles.filterButton} ${postsButtonStyle}`}
                    onClick={handleFilterButtonClick}>
                    Posts
                </button>
                <button 
                    id="subreddits"
                    type="button" 
                    className={`${styles.filterButton} ${subredditsButtonStyle}`}
                    onClick={handleFilterButtonClick}>
                    Subreddits
                </button>
            </div>
            <div className={styles.searchResults}>
                {showPosts && <PostResults results={results} isFetching={isFetching}/>}
                {!showPosts && <SubredditResults results={results} isFetching={isFetching}/>}
            </div>
        </div>
    )
}

export default Search;