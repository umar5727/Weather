import React, { useContext, useState } from 'react'
import { server_url } from '../../constants'
import LocationContext from '../context/LocationContext'

const AddPlace = async ({ formData }) => {
    const { setCityData } = useContext(LocationContext)
    const [errors, setErrors] = useState("")
    console.log(formData)
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: { "Content-Type": "multipart/form-data" },
        body: formData
    };
    try {
        const response = await fetch(`${server_url}/addPlace`, options)
        if (response.status >= 400) {
            const errorData = response.json();
            throw new Error(errorData.message)
        }
        const { placeData } = response.json();
        setCityData(placeData)

    } catch (error) {
        setErrors(error.message)

        return (
            errors
        )
    } finally {
        const { errors, responseResult } = useAllPlaces()
    }
    console.log(placeData)
    return (placeData.message)
}

export default AddPlace