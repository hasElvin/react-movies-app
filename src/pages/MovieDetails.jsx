import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { FaArrowLeft } from 'react-icons/fa';
import { fetchMovieById } from "../services/api";
import imdbLogo from "../assets/imdb.png"
import config from "../config";
import "../css/MovieDetails.css"

function MovieDetails() {
    const { API_IMAGE_BASE_URL, IMDB_BASE_URL } = config;
    const { movieId } = useParams()

    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()

    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMovie() {
            try {
                const fetchedMovie = await fetchMovieById(movieId)
                setMovie(fetchedMovie)
                setError(null)
            } catch (err) {
                console.error(err)
                setError("Failed to load movie details...")
            } finally {
                setLoading(false)
            }
        }

        fetchMovie()
    }, [movieId])

    const favorite = movie ? isFavorite(movie.id) : false;

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    if (loading) return <div className="loading">Loading...</div>
    if (error) return <div className="error-message">{error}</div>
    if (!movie) return <h1>{movie.id}</h1>

    return (
        <div className="movie-details-wrapper">
            <button className="back-button" onClick={() => navigate('/')}>
                <FaArrowLeft className="back-icon" />
                <span>Back</span>
            </button>

            <div className="movie-details">
                <div className="poster-container">
                    <img
                        className="details-poster"
                        src={`${API_IMAGE_BASE_URL}${movie.poster_path}`}
                        alt="{movie.title}"
                    />
                    <div className="movie-overlay">
                        <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                            ♥
                        </button>
                    </div>
                </div>

                <div className="details-info">
                    <h1 className="details-title">
                        {movie.title}
                        <span className="details-year">
                            ({movie.release_date.slice(0, 4)})
                            {movie.imdb_id && (
                                <a
                                    href={`${IMDB_BASE_URL}/${movie.imdb_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={imdbLogo}
                                        alt="IMDB"
                                        className="imdb-logo"
                                    />
                                </a>
                            )}
                        </span>
                    </h1>
                    <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                    <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
                    <p><strong>Language:</strong> {movie.original_language.toUpperCase()}</p>
                    <p><strong>Overview:</strong> {movie.overview}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails
