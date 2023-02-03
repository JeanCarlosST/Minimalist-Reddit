import React, { useRef } from "react"
import { FaSearch } from "react-icons/fa";
import styles from './SearchBar.module.css';

const SearchBar = () => {

    const searchInputRef = useRef();

    return (
        <div className={styles.searchBar}>
            <input 
                type="text" 
                className={styles.searchInput} 
                ref={searchInputRef}
                placeholder="Search"/>
            <button type="button" className={styles.searchButton}>
                <FaSearch />
            </button>
        </div>
    )
}

export default SearchBar;