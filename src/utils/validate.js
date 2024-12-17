export const checkValidData = (email, password, name) => {
  const isEmailValid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
    email
  )
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    )

  const isNameValid = /^[\p{L} .'-]+$/u.test(name)

  if (!isEmailValid) return "Email is Invalid"
  if (!isNameValid) return "Name is Invalid"
  if (!isPasswordValid) return "Password is Invalid"

  return null
}
