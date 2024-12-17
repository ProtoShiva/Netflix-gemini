import { createSlice } from "@reduxjs/toolkit"

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResult: null,
    movieName: null,
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch
    },
    addGptMovieResult: (state, action) => {
      const { movieResult, movieNames } = action.payload
      state.movieResult = movieResult
      state.movieName = movieNames
    },
  },
})

export const { toggleGptSearch, addGptMovieResult } = gptSlice.actions
export default gptSlice.reducer
