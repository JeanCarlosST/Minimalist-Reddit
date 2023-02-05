import React, { useRef, useState } from "react"
import { FaSearch } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from './SearchBar.module.css';

const SearchBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const termParam = searchParams.get("term");
    const [ term, setTerm ] = useState(termParam ?? "");

    const handleSubmit = (e) => {
        e.preventDefault();

        const searchQuery = new URLSearchParams({
            term: term
        });

        navigate(`/search?${searchQuery}`);
    };

    const handleChange = ({target}) => {
        if(target.value)
            setTerm(target.value);
    }

    return (
        <form className={styles.searchBar} onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={term}
                className={styles.searchInput} 
                placeholder="Search"
                onChange={handleChange}/>
            <button type="submit" className={styles.searchButton}>
                <FaSearch />
            </button>
        </form>
    )
}

export default SearchBar;