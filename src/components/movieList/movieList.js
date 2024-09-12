import React, { useEffect, useState, useRef } from 'react';
import Cards from '../cards/cards';
import './movieList.css';

const MovieList = (props) => {
    const type = Object.keys(props)[0];
    const [movieList, setMovieList] = useState([]);
    const sliderRef = useRef(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then(response => response.json())
            .then(data => setMovieList(data.results));
    }, [type]);

    const scroll = (direction) => {
        const { current } = sliderRef;
        if (current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="movie__group">
            <h2 className="list__title">{type === "top_rated" ? "TOP RATED" : type.toUpperCase()}</h2>
            <div className="movie__list">
                <button className="slider__button prev" onClick={() => scroll('left')}>❮</button>
                <div className="movie__slider" ref={sliderRef}>
                    {movieList && movieList.map(movie => (
                        <Cards key={movie.id} movie={movie} />
                    ))}
                </div>
                <button className="slider__button next" onClick={() => scroll('right')}>❯</button>
            </div>
        </div>
    );
};

export default MovieList;
