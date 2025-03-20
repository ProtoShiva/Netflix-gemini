export const checkValidData = (email, password, name) => {
  if (email === "") return "Email can't be empty"
  if (password === "") return "Password can't be empty"
  if (name === "") return "name can't be empty"

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
