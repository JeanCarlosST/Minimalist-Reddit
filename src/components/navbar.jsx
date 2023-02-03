import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchbar";
import logo from "../assets/images/logo.png"
import {authorizeUser} from '../services/redditApi'
import { FaSignInAlt } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to={"/"} className="homelink">
                <img src={logo}/>
                <p>Minimalist <span>Reddit</span></p>
            </Link>
            <SearchBar/>
            <button type="button" className="loginButton" value={"d"} onClick={authorizeUser}>
                Log In
            </button>
        </nav>
    )
}

export default Navbar;