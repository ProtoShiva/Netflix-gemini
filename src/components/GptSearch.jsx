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
        className="fixed -z-10 inset-0 h-screen w-screen object-cover"
      />
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  )
}

export default GptSearch
