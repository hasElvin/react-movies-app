import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
    const [popularMovies, setPopularMovies] = useState({})
    const [lastFetched, setLastFetched] = useState(null)

    const [favorites, setFavorites] = useState(() => {
        const storedFavs = localStorage.getItem("favorites")
        return storedFavs ? JSON.parse(storedFavs) : []
    })

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const isFetchExpired = () => {
        const thresholdInMs = 10 * 60 * 1000

        if (!lastFetched) return true
        return (Date.now() - lastFetched) > thresholdInMs
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        popularMovies,
        setPopularMovies,
        lastFetched,
        setLastFetched,
        isFetchExpired
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}