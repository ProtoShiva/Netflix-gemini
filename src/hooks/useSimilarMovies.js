import { useDispatch } from "react-redux"
import { addSimilarMovies } from "../redux/slices/singleMovieSlice"
import { useEffect } from "react"
import { API_OPTIONS } from "../utils/constants"

export const useSimilarMovies = (id) => {
  const dispatch = useDispatch()

  async function fetchSimilarMovies() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
      API_OPTIONS
    )
    const data = await response.json()

    dispatch(addSimilarMovies(data))
  }

  useEffect(() => {
    fetchSimilarMovies()
  }, [id])
}
