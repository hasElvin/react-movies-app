export const getSearchHistory = () => {
    const stored = localStorage.getItem('searchHistory')
    return stored ? JSON.parse(stored) : []
}

export const addSearchQuery = (query) => {
    const history = getSearchHistory()

    const filtered = history.filter(item => item !== query)
    const updated = [query, ...filtered].slice(0, 10)
    localStorage.setItem('searchHistory', JSON.stringify(updated))
}