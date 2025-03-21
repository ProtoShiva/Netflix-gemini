import { useDispatch } from "react-redux"
import { auth } from "../utils/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { addUser } from "../redux/slices/userSlice"
import { USER_AVATAR } from "../utils/constants"

export const signUpUser = (
  email,
  password,
  name,
  setErrMessagge,
  setLoading,
  dispatch
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      updateProfile(user, {
        displayName: name,
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
      setErrMessagge("User Doesn't Exist" + errorCode + "-" + errorMessage)
    })
}

export const signInUser = (email, password, setErrMessagge, setLoading) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      setErrMessagge("User Doesn't Exist" + errorCode + "-" + errorMessage)
      setLoading(false)
    })
}
