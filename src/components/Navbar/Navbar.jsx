import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import logo from "../../assets/images/logo.png"
import {authorizeUser} from '../../services/redditApi'
import { FaSignInAlt } from "react-icons/fa";
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Link to={"/"} className={styles.homelink}>
                <img src={logo}/>
                <p>Minimalist <span>Reddit</span></p>
            </Link>
            <SearchBar/>
            <div></div>
            <button type="button" className={styles.loginButton} value={"d"} onClick={authorizeUser}>
                Log In
            </button>
        </nav>
    )
}

export default Navbar;