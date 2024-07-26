import { useState } from 'react'
import LocationContext from './LocationContext'


const LocationContextProvider = ({ children }) => {
    const [general, setGeneral] = useState({
        temp_c: null,
        temp_f: null,
        last_updated: null,
        name: '',
        region: '',
    })
    const [cityData, setCityData] = useState()
    return (
        <LocationContext.Provider value={{ general, setGeneral }}>

            {children}

        </LocationContext.Provider>
    )
}

export default LocationContextProvider