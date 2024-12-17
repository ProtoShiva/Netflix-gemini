import React, { useEffect, useState } from "react"
import { auth } from "../utils/firebase"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useDispatch, useSelector } from "react-redux"
import { addUser, removeUser } from "../redux/slices/userSlice"
import {
  API_OPTIONS,
  BGPOSTER_URL,
  langOptions,
  LOGO,
  MOVIE_SEARCH_API,
  POSTER_URL,
} from "../utils/constants"
import { cacheSearchResults } from "../redux/slices/searchSlice"
import { toggleGptSearch } from "../redux/slices/gptSlice"
import { changeLanguages } from "../redux/slices/configSlice"
import { GiHamburgerMenu } from "react-icons/gi"
import { FiSearch } from "react-icons/fi"
import { extractYear } from "../utils/helper"

const Header = () => {
  const [openIcon, setOpenIcon] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestion, setSuggestion] = useState([])
  const [showSuggestion, setShowSuggestion] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const dispatch = useDispatch()
  const userInfo = useSelector((store) => store.user)
  const gptSearch = useSelector((store) => store.gpt.showGptSearch)
  const searchCache = useSelector((store) => store.search)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error")
      })
  }

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(
        `${MOVIE_SEARCH_API}${searchQuery}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      )
      const data = await response.json()
      setSuggestion(data?.results)

      //update cache
      dispatch(
        cacheSearchResults({
          [searchQuery]: data?.results,
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleQueryClick = () => {
    setSearchQuery("")
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguages(e.target.value))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // user is signUp / signIn
        const { uid, email, displayName, photoURL } = user
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        )
        if (location.pathname === "/browse" || location.pathname === "/")
          navigate("/browse")
      } else {
        // User is signed out
        dispatch(removeUser())
        navigate("/")
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const time = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestion(searchCache[searchQuery])
      } else {
        fetchSuggestions()
      }
    }, 200)

    return () => {
      clearTimeout(time)
    }
  }, [searchQuery])

  return (
    <div className="px-4 relative z-40 bg-gradient-to-b from-black w-full  flex justify-between items-center">
      <Link to={"/browse"}>
        <img className="w-32 xl:w-48" src={LOGO} alt="netflix-logo" />
      </Link>
      {userInfo && (
        <>
          <div className="flex gap-2 items-center relative w-[60%] mr-3">
            <input
              className="w-full outline-blue-600 text-gray-500 text-sm sm:text-lg bg-gray-200 border-0  rounded-md px-2 py-1"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleChange}
              onFocus={() => setShowSuggestion(true)}
              // onBlur={() => setShowSuggestion(false)}
            />
            <FiSearch className="size-6 cursor-pointer text-white hidden sm:block" />
            {showSuggestion && suggestion?.length > 0 && (
              <div className="bg-white shadow-lg rounded-sm  h-fit absolute top-11 sm:w-[96%] md:w-[93%] lg:w-[95%] w-full">
                {suggestion
                  .filter((movie) => movie.popularity >= 27)
                  .slice(0, 5)
                  .map((s) => (
                    <Link to={`/movie/${s?.id}`} key={s?.id}>
                      <div
                        className="hover:bg-gray-300 p-2  cursor-pointer flex gap-1 items-center  shadow-sm"
                        onClick={handleQueryClick}
                      >
                        <img
                          src={`${POSTER_URL}${s?.poster_path}`}
                          className="w-14 object-contain"
                          alt={`${s?.title || s?.name} poster`}
                        />
                        <div className="flex flex-col gap-1 text-sm">
                          <p> {s?.name || s?.title}</p>
                          <p>
                            {extractYear(s?.release_date || s?.first_air_date)}
                          </p>
                          <p>
                            ⭐ {s?.vote_average && (s?.vote_average).toFixed(1)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 relative">
            {openIcon && (
              <div className="bg-gray-700 flex flex-col justify-center gap-4  w-40 absolute z-10 right-0 -bottom-48 rounded-md p-3">
                <p className="text-gray-100 text-sm font-bold text-center">
                  {userInfo.displayName}
                </p>
                <button
                  className="py-2 px-2 text-xs lg:text-sm bg-teal-500 text-white rounded-lg cursor-pointer"
                  onClick={() => dispatch(toggleGptSearch())}
                >
                  {gptSearch ? "HomePage" : "GPT Search"}
                </button>
                <select
                  className="bg-gray-300 cursor-pointer"
                  onChange={handleLanguageChange}
                >
                  {langOptions.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleSignOut}
                  className="font-medium bg-red-700 px-4  py-2 text-xs lg:text-sm rounded-xl text-white cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}

            <div className="flex items-center gap-3">
              <img
                className="size-9 xl:size-14 cursor-pointer"
                src={userInfo.photoURL}
                alt="userIcon"
                onClick={() => setOpenIcon(!openIcon)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Header
