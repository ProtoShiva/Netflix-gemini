import React, { useRef, useState } from "react"
import Header from "./Header"
import { checkValidData } from "../utils/validate"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { auth } from "../utils/firebase"
import { useDispatch } from "react-redux"
import { addUser } from "../redux/slices/userSlice"
import { BG_URL, USER_AVATAR } from "../utils/constants"

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errMessage, setErrMessagge] = useState(null)
  const dispatch = useDispatch()
  const email = useRef(null)
  const password = useRef(null)
  const name = useRef(null)

  //Toggle the form
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }

  //handle the form submite
  const handleFormSubmit = (e) => {
    //checking validation
    e.preventDefault()
    let res
    if (isSignInForm) {
      res = checkValidData(email.current.value, password.current.value)
    } else {
      res = checkValidData(
        email.current.value,
        password.current.value,
        name.current.value
      )
    }

    setErrMessagge(res)

    if (res) return
    setLoading(true)
    //signIn signUp user
    if (!isSignInForm) {
      //signUp User
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              )
            })
            .catch((error) => {
              setErrMessagge(error.message)
              setLoading(false)
            })
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          setErrMessagge(errorCode, errorMessage)
        })
    } else {
      //signIn User
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          setErrMessagge("User Doesn't Exist")
          setLoading(false)
        })
    }
  }
  return (
    <div>
      <Header />
      <div className="absolute inset-0 h-[100vh] w-[100vw]">
        <img src={BG_URL} alt="bg" className="h-full w-full object-cover" />
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="w-[80%] md:w-[45%] xl:w-[23%] h-fit absolute -top-8 inset-0 p-8 bg-black bg-opacity-75 text-white my-36 mx-auto right-0 left-0"
      >
        <h1 className="font-bold text-2xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 md:p-4 my-2 w-full text-sm bg-gray-700"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-2 md:p-4 my-2 w-full text-sm bg-gray-700"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 md:p-4 my-2 text-sm w-full bg-gray-700"
        />
        <p className="text-red-500 text-lg font-bold py-2">{errMessage}</p>
        <button className="p-2 md:p-4 my-6 w-full bg-red-600 rounded-lg">
          {loading ? "loading..." : isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now."
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  )
}

export default Login
