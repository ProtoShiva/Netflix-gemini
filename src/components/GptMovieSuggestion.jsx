import React from "react"
import { useSelector } from "react-redux"
import MovieList from "./MovieList"
import GptSearchResult from "./GptSearchResult"

const GptMovieSuggestion = () => {
  const { movieResult, movieName } = useSelector((store) => store.gpt)

  if (!movieName) return null

  return (
    <div className="m-4 bg-black text-white bg-opacity-60 grid grid-cols-2 gap-2 justify-items-center py-8 sm:grid-cols-4 md:grid-cols-5">
      {movieResult?.map((movie) => {
        if (!movie || !movie[0]?.id) return null
        return <GptSearchResult key={movie[0]?.id} movie={movie} />
      })}
    </div>
  )
}

export default GptMovieSuggestion
