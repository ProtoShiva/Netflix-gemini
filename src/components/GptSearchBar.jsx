import React, { useRef, useState } from "react"
import { lang } from "../utils/langConstants"
import { useDispatch, useSelector } from "react-redux"
import { API_OPTIONS } from "../utils/constants"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { addGptMovieResult } from "../redux/slices/gptSlice"

const GptSearchBar = () => {
  const [loading, setLoading] = useState(false)
  const langKey = useSelector((store) => store.config.lang)
  const searchText = useRef(null)
  const dispatch = useDispatch()
  const searchGptMovies = async (movie) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    )

    const data = await res.json()
    return data.results
  }

  const handleGptSearchClick = async () => {
    setLoading(true)
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY)

    //Make an API call to GPT and get results
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query" +
      searchText.current.value +
      ".Only give me 10 movies, comma seprated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya"

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const result = await model.generateContent(gptQuery)

    if (!result) {
      //error message
    }
    const gptMovies = result.response?.text().split(",")
    console.log(gptMovies)
    const promiseArray = gptMovies.map((movie) => searchGptMovies(movie))
    const tmdbResults = await Promise.all(promiseArray)
    dispatch(
      addGptMovieResult({ movieResult: tmdbResults, movieNames: gptMovies })
    )

    setLoading(false)
  }

  return (
    <div className="flex justify-center py-6">
      <form
        className="flex bg-black h-14 justify-between p-2 w-[80%] lg:w-[50%]"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptPlaceholder}
          className="text-sm w-[60%] lg:text-lg px-4 sm:w-[80%]"
        />
        <button
          className="bg-red-700 rounded-lg text-white px-6 py-2"
          onClick={handleGptSearchClick}
        >
          {loading ? "searching..." : lang[langKey].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar
