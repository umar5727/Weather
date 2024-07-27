import React, { useContext, useEffect, useState } from 'react'
import LocationContext from '../context/LocationContext'

const GetAllPlaces = () => {

    const { general, setCityData } = useContext(LocationContext)

    const { errors, setErrors } = useState()
    const { loading, setLoading } = useState(false)

    console.log(placeData)
    // return response.json().message

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const options = {
                    method: 'POST',
                    mode: 'cors',
                    body: { city: general.name }
                };
                const response = await fetch(`${server_url}/AllPlaces`, options)
                if (response.status >= 400) {
                    const errorData = await response.json();
                    throw new Error(errorData.message)
                }
                const { placeData } = await response.json();
                setCityData(placeData)
                // setErrors(await response.json().message)

            } catch (error) {
                setErrors(error)
                return (
                    errors
                )
            } finally {
                setLoading(false)
            }
        }
        if (general.name) {

            fetchData();
        }
    }, [general?.name])

}
return { error }
export default GetAllPlaces