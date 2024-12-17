import React from "react"
import { POSTER_URL } from "../utils/constants"
import { FaStar } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toggleGptSearch } from "../redux/slices/gptSlice"

const GptSearchResult = ({ movie }) => {
  const dispatch = useDispatch()
  return (
    <div
      className="w-32 lg:w-40 xl:w-56  cursor-pointer"
      onClick={() => dispatch(toggleGptSearch())}
    >
      <Link to={`/movie/${movie[0]?.id}`}>
        <img
          src={POSTER_URL + movie[0]?.poster_path}
          alt={movie[0]?.title + " Poster"}
          className="rounded-md "
        />
      </Link>
      <div>
        <p className="flex gap-2 items-center mt-3">
          <span className="text-yellow-500">
            <FaStar />
          </span>
          {movie[0]?.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  )
}

export default GptSearchResult
