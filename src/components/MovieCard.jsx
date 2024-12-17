import React from "react"
import { POSTER_URL } from "../utils/constants"

const MovieCard = ({ poster, movieTitle }) => {
  if (!poster) return
  return (
    <div className="w-28 lg:w-32 xl:w-44 pr-4 rounded-md">
      <img
        src={POSTER_URL + poster}
        alt={movieTitle + " poster"}
        className="cursor-pointer rounded-md"
      />
    </div>
  )
}

export default MovieCard
