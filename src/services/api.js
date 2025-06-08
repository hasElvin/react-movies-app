import config from "../config";

const { API_BASE_URL } = config;
const { API_KEY } = config;

export const getPopularMovies = async (page = 1) => {
    const res = await fetch(`${API_BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`)
    const data = await res.json()
    return data
}

export const searchMovies = async (searchQuery) => {
    const res = await fetch(
        `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            searchQuery
        )}`
    )
    const data = await res.json()
    return data.results
}

export const fetchMovieById = async (movieId) => {
    const res = await fetch(
        `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    )
    const data = await res.json()
    return data
}