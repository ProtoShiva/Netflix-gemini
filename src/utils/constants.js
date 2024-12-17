export const LOGO =
  "https://cdn.prod.website-files.com/5ee732bebd9839b494ff27cd/5ee732bebd98393d75ff281d_580b57fcd9996e24bc43c529.png"
export const USER_AVATAR =
  "https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg"

export const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/74d734ca-0eab-4cd9-871f-bca01823d872/web/IN-en-20241021-TRIFECTA-perspective_2277eb50-9da3-4fdf-adbe-74db0e9ee2cf_large.jpg"

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_TMDB_TOKEN,
  },
}

export const POSTER_URL = "https://image.tmdb.org/t/p/w780"
export const BGPOSTER_URL = "https://image.tmdb.org/t/p/w1280"
export const PLATFORM_URL = "https://image.tmdb.org/t/p/w500"
export const GENERIC_POSTER_URL =
  "https://cdn.vectorstock.com/i/1000v/48/38/movie-and-film-poster-design-template-background-vector-43074838.jpg"

export const MOVIE_SEARCH_API =
  "https://api.themoviedb.org/3/search/multi?query="

export const langOptions = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" },
  { identifier: "german", name: "German" },
]
