import Login from "./Login"
import Browse from "./Browse"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MovieDetails from "./MovieDetails"
import TestComp from "./TestComp"

const Body = () => {
  const appRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/movie/:id",
      element: <MovieDetails />,
    },
    {
      path: "/test",
      element: <TestComp />,
    },
  ])

  return (
    <div>
      <RouterProvider router={appRoutes} />
    </div>
  )
}

export default Body
