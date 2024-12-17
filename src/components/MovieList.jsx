import React from "react"
import { Link } from "react-router-dom"
import MovieCard from "./MovieCard"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-1">
      <h1 className="text-base md:text-lg xl:text-2xl py-2 xl:py-6 text-white">
        {title}
      </h1>
      <Swiper
        slidesPerView={3}
        slidesPerGroup={2}
        loop={true}
        breakpoints={{
          768: {
            slidesPerView: 6,
            slidesPerGroup: 4,
          },
          1024: {
            slidesPerView: 7,
            slidesPerGroup: 6,
          },
          1280: {
            slidesPerView: 7,
            slidesPerGroup: 7,
          },
        }}
      >
        {movies &&
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link to={"/movie/" + movie.id}>
                <MovieCard
                  poster={movie.poster_path}
                  movieTitle={movie.original_title}
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default MovieList
