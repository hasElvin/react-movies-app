import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useMovieContext } from "../contexts/MovieContext"
import { searchMovies, getPopularMovies } from "../services/api"
import { getSearchHistory, addSearchQuery } from "../services/utils"
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState('')
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showHistory, setShowHistory] = useState(false)
    const [searchHistory, setSearchHistory] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const location = useLocation()

    const { popularMovies, setPopularMovies,
        setLastFetched, isFetchExpired } = useMovieContext()

    const loadPopularMovies = async (page = 1) => {
        setLoading(true)
        setError(null)

        const isCached = popularMovies[page] && !isFetchExpired()

        if (isCached) {
            setMovies(popularMovies[page].results)
            setTotalPages(popularMovies[page].totalPages)
            setLoading(false)
            return
        }

        try {
            const data = await getPopularMovies(page)
            setPopularMovies(prev => ({
                ...prev,
                [page]: {
                    results: data.results,
                    totalPages: data.total_pages
                }
            }))
            setMovies(data.results)
            setTotalPages(data.total_pages)

            const now = Date.now()
            setLastFetched(now)
        } catch (err) {
            console.error(err)
            setError("Failed to load movies...")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (location.pathname === "/") {
            loadPopularMovies(currentPage)
            setSearchQuery("")
        }
    }, [location, currentPage])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim() || loading) return

        addSearchQuery(searchQuery.trim())

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }
    }

    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                placeholder="Search for movies..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                    setSearchHistory(getSearchHistory())
                    setShowHistory(true)
                }}
                onBlur={() => {
                    setTimeout(() => setShowHistory(false), 100)
                }}
            />

            {showHistory && searchHistory.length > 0 && (
                <ul className="search-history-dropdown">
                    {searchHistory.map((query, index) => (
                        <li
                            key={index}
                            className="search-history-item"
                            onMouseDown={() => {
                                setSearchQuery(query)
                                setShowHistory(false)
                            }}
                        >
                            {query}
                        </li>
                    ))}
                </ul>
            )}

            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
            <div className="loading">Loading...</div>
        ) : (
            <div className="movies-grid">
                {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        )}

        {!loading && !searchQuery && (
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                <span>Page {currentPage} of {totalPages}</span>

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        )}
    </div>
}

export default Home