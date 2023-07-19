import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TransferenciasPage from "./pages/TransferenciasPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/transferencias",
      element: <TransferenciasPage />
    },
    {
      path: "*",
      element: <NotFoundPage />
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}
