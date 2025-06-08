import './css/App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import MovieDetails from './pages/MovieDetails'
import About from './pages/About'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/movies/:movieId' element={<MovieDetails />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App
