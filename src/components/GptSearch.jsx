import React from "react"
import GptSearchBar from "./GptSearchBar"
import GptMovieSuggestion from "./GptMovieSuggestion"
import { BG_URL } from "../utils/constants"

const GptSearch = () => {
  return (
    <div>
      <img
        src={BG_URL}
        alt="bg"
        className="h-screen w-screen -z-10 fixed inset-0 object-cover"
      />
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  )
}

export default GptSearch
