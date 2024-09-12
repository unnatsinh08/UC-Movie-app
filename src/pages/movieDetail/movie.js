import React, { useEffect, useState } from 'react';
import "./movie.css";
import { useParams } from "react-router-dom";
import ReactHlsPlayer from "react-hls-player";
import { useDispatch, useSelector } from "react-redux";
import { setFavourite, removeFavourite, setCurrentMovieDetail } from "../../redux/action";

const Movie = () => {
    const dispatch = useDispatch();
    const favouriteMovies = useSelector(state => state.favouriteMovies);
    const currentMovieDetail = useSelector(state => state.currentMovieDetail);
    const [showHlsPlayer, setShowHlsPlayer] = useState(false);
    const { id } = useParams();
    const [showFavourite, setShowFavourite] = useState(false);

    useEffect(() => {
        dispatch(setCurrentMovieDetail(id));
    }, [dispatch, id]);

    useEffect(() => {
        const isFavourite = favouriteMovies.some(favMovie => favMovie.id === currentMovieDetail.id);
        setShowFavourite(isFavourite);
    }, [favouriteMovies, currentMovieDetail]);

    const handleFavouriteClick = () => {
        if (showFavourite) {
            dispatch(removeFavourite(currentMovieDetail));
        } else {
            dispatch(setFavourite(currentMovieDetail));
        }
        setShowFavourite(!showFavourite);
    };

    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} alt="Backdrop" />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} alt="Poster" />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i className="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {currentMovieDetail && currentMovieDetail.genres && currentMovieDetail.genres.map(genre => (
                                <span key={genre.id} className="movie__genre">{genre.name}</span>
                            ))}
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">
                            Synopsis
                            <span className="favourite" onClick={handleFavouriteClick}>
                                {showFavourite ? (
                                    <>Favourite<i className="newTab favouriteOne fas fa-heart" /></>
                                ) : (
                                    <>Add to favourite<i className="newTab nonFavourite far fa-heart" /></>
                                )}
                            </span>
                        </div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {currentMovieDetail && (
                    <>
                        <div className="movie__linkItem">
                            <a
                                className="movie__previewButton"
                                onClick={() => setShowHlsPlayer(prev => !prev)}
                            >
                                Preview video
                                {showHlsPlayer ? <i className="newTab far fa-eye" /> : <i className="newTab far fa-eye-slash" />}
                            </a>
                        </div>
                        {currentMovieDetail.homepage && (
                            <div className="movie__linkItem">
                                <a
                                    className="movie__homeButton"
                                    href={currentMovieDetail.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Homepage <i className="newTab fas fa-external-link-alt" />
                                </a>
                            </div>
                        )}
                        {currentMovieDetail.imdb_id && (
                            <div className="movie__linkItem">
                                <a
                                    className="movie__imdbButton"
                                    href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    IMDb <i className="newTab fas fa-external-link-alt" />
                                </a>
                            </div>
                        )}
                    </>
                )}
            </div>
            {showHlsPlayer && (
                <>
                    <div className="movie__heading">Movie preview video</div>
                    <div className="movie__hlsPlayer">
                        <ReactHlsPlayer
                            src="https://content.jwplatform.com/manifests/yp34SRmf.m3u8"
                            autoPlay={true}
                            controls={true}
                            width="75%"
                        />
                    </div>
                </>
            )}
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                    company.logo_path && (
                        <div key={company.id} className="productionCompanyImage">
                            <img className="movie__productionCompany" src={`https://image.tmdb.org/t/p/original${company.logo_path}`} alt={company.name} />
                            <span>{company.name}</span>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Movie;
