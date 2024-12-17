import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { API_OPTIONS } from "../utils/constants"
import { addPopularMovies } from "../redux/slices/movieSlice"

const usePopularMovies = () => {
  const dispatch = useDispatch()
  const popularMovies = useSelector((store) => store.movies.popularMovies)
  const fetchMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS
    )
    const data = await res.json()

    dispatch(addPopularMovies(data.results))
  }

  useEffect(() => {
    if (!popularMovies) fetchMovies()
  }, [])
}

export default usePopularMovies
