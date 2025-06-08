import "../css/MovieCard.css"
import config from "../config";
import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    const { API_IMAGE_BASE_URL } = config;
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    return (
        <Link to={`/movies/${movie.id}`} className="movie-card-link">
            <div className="movie-card">
                <div className="movie-poster">
                    <img src={`${API_IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                    <div className="movie-overlay">
                        <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                            ♥
                        </button>
                    </div>
                </div>
                <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date?.split("-")[0]}</p>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard