import React from "react"
import { Link, useParams } from "react-router-dom"
import { useMovieDetail } from "../hooks/useMovieDetail"
import { useMovieCast } from "../hooks/useMovieCast"
import { usePlatforms } from "../hooks/usePlatforms"
import { useSimilarMovies } from "../hooks/useSimilarMovies"
import { useSelector } from "react-redux"
import {
  BGPOSTER_URL,
  GENERIC_POSTER_URL,
  PLATFORM_URL,
  POSTER_URL,
} from "../utils/constants"
import Header from "./Header"
import { convertToK } from "../utils/helper"
import { FaStar } from "react-icons/fa"
import { BiSolidTv } from "react-icons/bi"
import GptSearch from "./GptSearch"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"

const MovieDetails = () => {
  const { id } = useParams()
  useMovieDetail(id)
  useMovieCast(id)
  usePlatforms(id)
  useSimilarMovies(id)
  const gptSearch = useSelector((store) => store.gpt.showGptSearch)
  const movieDetails = useSelector((store) => store.singleMovie.movieDetail)
  const castDetails = useSelector((store) => store.singleMovie.castDetail)
  const Platforms = useSelector((store) => store.singleMovie.platforms)
  const similarMovies = useSelector((store) => store.singleMovie.similarMovies)

  return (
    <div className={`${gptSearch ? "" : "bg-slate-950 relative z-50"}`}>
      <Header />
      {gptSearch ? (
        <GptSearch />
      ) : (
        <div className="flex flex-col -z-10 relative inset-0 md:mx-24 xl:mx-32 -top-[7rem] bg-slate-950">
          <div className="h-[16rem] md:h-[20rem] xl:h-[35rem] md:w-full w-screen relative">
            <img
              src={BGPOSTER_URL + `${movieDetails?.backdrop_path}`}
              alt={`${movieDetails?.title} bg-image`}
              className="h-full w-full object-cover"
            />
            <div className="w-full absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950"></div>
          </div>
          <div className="grid grid-cols-1 ml-6">
            <div className="text-white ">
              <div>
                <h1 className="text-xl xl:text-3xl font-bold pt-12">
                  Overview
                </h1>
                <p className="text-sm xl:text-xl pt-2">
                  {movieDetails?.overview}
                </p>
              </div>
              <div>
                <h2 className="text-xl xl:text-3xl font-bold pt-6">TagLine</h2>
                <p className="text-sm xl:text-xl pt-2">
                  {movieDetails?.tagline}
                </p>
              </div>
              <div>
                <h3 className="text-xl xl:text-3xl font-bold pt-6">Genres</h3>
                <ul className="flex gap-3 text-sm pt-2">
                  {movieDetails?.genres?.map((gen) => (
                    <li key={gen.id} className="xl:text-xl">
                      {gen.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-white hidden md:block">
              <div className="border border-white">
                <h1 className="bg-gray-600 p-2 text-sm xl:text-xl flex items-center justify-center gap-3">
                  Where to Watch
                  <span>
                    <BiSolidTv className="size-5 xl:size-7" />
                  </span>
                </h1>
                <ul className="p-3">
                  {Platforms?.results?.US?.buy?.map((item) => (
                    <li
                      key={item.provider_id}
                      className="flex items-center gap-3 justify-between lg:gap-3 xl:gap-8 text-sm xl:text-xl pb-3"
                    >
                      {item.provider_name}
                      <span>
                        <img
                          className="size-5 xl:size-7"
                          src={PLATFORM_URL + `${item.logo_path}`}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-white col-span-3 ">
              <h1 className="text-xl font-bold pt-6 pb-4 xl:text-3xl">
                Top Cast
              </h1>
              <Swiper
                slidesPerView={3}
                slidesPerGroup={2}
                breakpoints={{
                  768: {
                    slidesPerView: 5,
                    slidesPerGroup: 4,
                  },
                  1440: {
                    slidesPerView: 7,
                    slidesPerGroup: 4,
                  },
                }}
              >
                {castDetails?.cast.slice(0, 10)?.map((actor) => (
                  <SwiperSlide key={actor.id}>
                    <div className="flex relative z-50 flex-col items-center justify-center">
                      <img
                        src={POSTER_URL + `${actor.profile_path}`}
                        alt={actor.original_name + " photo"}
                        className="size-16 xl:size-28 rounded-full object-cover"
                      />
                      <div className="flex flex-col justify-center items-center">
                        <p className="text-sm text-center xl:text-xl">
                          {actor.original_name}
                        </p>
                        <p className="text-xs text-center text-gray-400">
                          {actor.character}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="text-white pt-6 mr-6 md:hidden">
              <div className="border border-white">
                <h1 className="bg-gray-600 p-2 font-bold flex items-center justify-center gap-3">
                  Where to Watch
                  <span>
                    <BiSolidTv className="size-5" />
                  </span>
                </h1>
                <ul className="p-3">
                  {Platforms?.results?.US?.buy?.map((item) => (
                    <li
                      key={item.provider_id}
                      className="flex items-center justify-between text-sm pb-3"
                    >
                      {item.provider_name}
                      <span>
                        <img
                          className="size-6"
                          src={PLATFORM_URL + `${item.logo_path}`}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-white col-span-3">
              <h1 className="text-xl font-bold pt-6 pb-4 xl:text-3xl">
                Recommended Movies
              </h1>
              <div className="flex gap-3 flex-wrap">
                <Swiper
                  slidesPerView={3}
                  slidesPerGroup={2}
                  breakpoints={{
                    768: {
                      slidesPerView: 5,
                      slidesPerGroup: 4,
                    },
                  }}
                >
                  {similarMovies?.results?.slice(0, 6)?.map((movie) => (
                    <SwiperSlide key={movie.id}>
                      <Link to={"/movie/" + movie.id}>
                        <div>
                          <img
                            src={
                              POSTER_URL + `${movie?.poster_path}` ===
                              "https://image.tmdb.org/t/p/w780null"
                                ? GENERIC_POSTER_URL
                                : POSTER_URL + `${movie?.poster_path}`
                            }
                            alt={`${movieDetails?.title} poster`}
                            className="rounded-md w-24 xl:w-44"
                          />
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          <div className="absolute text-white inset-0 top-36 md:top-40 xl:top-60 mx-6 h-fit w-fit">
            <img
              src={POSTER_URL + `${movieDetails?.poster_path}`}
              alt={`${movieDetails?.title} poster`}
              className="rounded-md w-20 md:w-28 xl:w-48 border border-white box shadow-lg"
            />
            <div className="flex items-center justify-center gap-2 py-2">
              <FaStar className="size-3 xl:size-6 text-yellow-400" />
              <p className="text-sm xl:text-xl xl:font-bold">
                {movieDetails?.vote_average.toFixed(1)}
                <span className="ml-1 ">
                  ({convertToK(movieDetails?.vote_count)})
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetails
