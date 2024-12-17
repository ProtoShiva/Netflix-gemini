import { useEffect } from "react"
import { API_OPTIONS } from "../utils/constants"
import { useDispatch } from "react-redux"
import { addCastDetail } from "../redux/slices/singleMovieSlice"

export const useMovieCast = (id) => {
  const dispatch = useDispatch()

  async function fetchCast() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      API_OPTIONS
    )
    const data = await response.json()

    dispatch(addCastDetail(data))
  }

  useEffect(() => {
    fetchCast()
  }, [id])
}
