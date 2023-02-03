import React, { useRef } from "react"
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {

    const searchInputRef = useRef();

    return (
        <div className="searchBar">
            <input 
                type="text" 
                className="searchInput" 
                ref={searchInputRef}
                placeholder="Search"/>
            <button type="button" className="searchButton">
                <FaSearch/>
            </button>
        </div>
    )
}

export default SearchBar;