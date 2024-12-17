import { useDispatch } from "react-redux"
import { addTrailer } from "../redux/slices/movieSlice"
import { useEffect } from "react"
import { API_OPTIONS } from "../utils/constants"

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch()

  const fetchTrailer = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    )

    const data = await response.json()

    //fetching videKey for the trailer
    const FilterTrailer = data.results.filter(
      (clip) => clip.name === "Official Trailer"
    )
    const trailer = FilterTrailer.length ? FilterTrailer[0] : data.results[0]

    dispatch(addTrailer(trailer))
  }

  useEffect(() => {
    fetchTrailer()
  }, [])
}

export default useMovieTrailer
