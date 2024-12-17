import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { API_OPTIONS } from "../utils/constants"
import { addTopRatedMovies } from "../redux/slices/movieSlice"

const useTopRatedMovies = () => {
  const dispatch = useDispatch()
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies)
  const fetchMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      API_OPTIONS
    )
    const data = await res.json()

    dispatch(addTopRatedMovies(data.results))
  }

  useEffect(() => {
    if (!topRatedMovies) fetchMovies()
  }, [])
}

export default useTopRatedMovies
