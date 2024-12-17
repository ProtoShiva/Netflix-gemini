import React from "react"
import { Link } from "react-router-dom"

const VideoTitle = ({ title, overview, id }) => {
  return (
    <div className="w-full aspect-video pt-[23%] md:pt-[16%] lg:pt-[18%] px-12 absolute text-white bg-gradient-to-r from from-black">
      <h1 className="text-xl md:text-3xl lg:text-5xl lg:mb-3 2xl:text-7xl font-bold">
        {title}
      </h1>
      <p className="py-4 2xl:py-8 text-sm xl:text-lg 2xl:text-xl h-fit w-[54%] overflow-hidden md:block hidden">
        {overview.split(" ").slice(0, 45).join(" ")}
        {overview.split(" ").length > 7 ? "..." : ""}
      </p>
      <div>
        <Link
          to={`/movie/${id}`}
          className="bg-gray-500 text-white text-xs p-1 rounded-sm md:rounded-md md:p-3 hover:bg-opacity-50 xl:text-sm 2xl:text-lg"
        >
          More Info
        </Link>
      </div>
    </div>
  )
}

export default VideoTitle
