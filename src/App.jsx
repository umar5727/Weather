import React from 'react'
import Home from './pages/Home'
import LocationContextProvider from './context/LocationContext.Provider'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/Weather' element={<Layout />}>
        <Route path='' element={<Home />} />

      </Route>
    )
  )
  return (

    <LocationContextProvider>
      {/* <Home /> */}
      <RouterProvider router={router} />

    </LocationContextProvider>
  )
}

export default App