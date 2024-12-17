import { createSlice } from "@reduxjs/toolkit"

const singleMovieSlice = createSlice({
  name: "singleMovie",
  initialState: {
    movieDetail: null,
    castDetail: null,
    platforms: null,
    similarMovies: null,
  },
  reducers: {
    addMovieDetail: (state, action) => {
      state.movieDetail = action.payload
    },
    addCastDetail: (state, action) => {
      state.castDetail = action.payload
    },
    addPlatforms: (state, action) => {
      state.platforms = action.payload
    },
    addSimilarMovies: (state, action) => {
      state.similarMovies = action.payload
    },
  },
})

export const { addMovieDetail, addCastDetail, addPlatforms, addSimilarMovies } =
  singleMovieSlice.actions
export default singleMovieSlice.reducer
