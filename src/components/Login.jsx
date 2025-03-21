import React, { useRef, useState } from "react"
import Header from "./Header"
import { checkValidData } from "../utils/validate"
import { BG_URL } from "../utils/constants"
import { signInUser, signUpUser } from "../utils/fireAuth"
import { useDispatch } from "react-redux"

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errMessage, setErrMessagge] = useState(null)
  const dispatch = useDispatch()

  const email = useRef(null)
  const password = useRef(null)
  const name = useRef(null)

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
    setErrMessagge("")
    email.current.value = ""
    password.current.value = ""
    name.current.value = ""
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    let res = isSignInForm
      ? checkValidData(email.current.value, password.current.value)
      : checkValidData(
          email.current.value,
          password.current.value,
          name.current.value
        )

    setErrMessagge(res)

    if (res) return
    setLoading(true)

    if (isSignInForm) {
      signInUser(
        email.current.value,
        password.current.value,
        setErrMessagge,
        setLoading
      )
    } else {
      signUpUser(
        email.current.value,
        password.current.value,
        name.current.value,
        setErrMessagge,
        setLoading,
        dispatch
      )
    }
  }
  return (
    <div>
      <Header />
      <div className="h-[100vh] w-[100vw] absolute inset-0">
        <img src={BG_URL} alt="bg" className="h-full w-full object-cover" />
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="bg-black bg-opacity-75 h-fit p-8 text-white w-[80%] -top-8 absolute inset-0 left-0 md:w-[45%] mx-auto my-36 right-0 xl:w-[23%]"
      >
        <h1 className="text-2xl font-bold py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="bg-gray-700 p-2 text-sm w-full md:p-4 my-2"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="bg-gray-700 p-2 text-sm w-full md:p-4 my-2"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="bg-gray-700 p-2 text-sm w-full md:p-4 my-2"
        />
        <p className="text-lg text-red-500 font-bold py-2">{errMessage}</p>
        <button className="bg-red-600 p-2 rounded-lg w-full md:p-4 my-6">
          {loading ? "loading..." : isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="cursor-pointer py-4" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now."
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  )
}

export default Login
