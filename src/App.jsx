import React from 'react'
import Home from './pages/Home'
import LocationContextProvider from './context/LocationContext.Provider'

const App = () => {
  return (
    <LocationContextProvider>
      <Home />
    </LocationContextProvider>
  )
}

export default App