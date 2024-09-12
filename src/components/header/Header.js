import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    const [darkMode] = useState(false);


    return (
        <div className={`header ${darkMode ? 'dark-mode' : ''}`}>
            <div className="headerLeft">
                <Link to="/TvMovie/">
                    <img className="header__icon" src="https://www.seekpng.com/png/full/10-104023_free-movie-clipart-movie-night.png" alt="Website Logo"/>
                </Link>
                <Link to="/TvMovie/movies/popular" style={{ textDecoration: 'none' }}>
                    <span>Popular</span>
                </Link>
                <Link to="/TvMovie/movies/top_rated" style={{ textDecoration: 'none' }}>
                    <span>Top rated</span>
                </Link>
                <Link to="/TvMovie/movies/upcoming" style={{ textDecoration: 'none' }}>
                    <span>Upcoming</span>
                </Link>
            </div>
            <div className="headerRight">
                <Link to="/TvMovie/movies/my-favourite" style={{ textDecoration: 'none' }}>
                    <span>My Favourites</span>
                </Link>
                <Link to="/TvMovie/">
                    <span>
                        <i className="user__avatar fas fa-user-circle"></i>
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Header;
