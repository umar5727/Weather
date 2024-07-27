import React, { useContext, useEffect, useState } from 'react'
import LocationContext from '../context/LocationContext'
import { server_url } from '../../constants'

const useAllPlaces = () => {
    const { general, cityData, setCityData } = useContext(LocationContext)
    const [responseResult, setResponseResult] = useState('')
    console.log(general.name)
    // const { loading, setLoading } = useState(false)
    const [errors, setErrors] = useState(null)

    const fetchData = async () => {
        try {
            // setLoading(true)
            const options = {
                method: 'POST',
                mode: 'cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ city: general.name })
            };
            const response = await fetch(`${server_url}/places/AllPlaces`, options)
            console.log('fetch')
            if (response.status >= 400) {
                const errorData = await response.json();
                throw new Error(errorData.message)
            }
            const finalResult = await response.json();
            const { placeData } = finalResult;
            console.log('response data: ', placeData)
            if (placeData) {
                console.log('\ninside')
                setCityData(placeData)
            } else {
                console.log('\noutside')
                setCityData(null)
            }
            setResponseResult(finalResult.message)

        } catch (error) {
            setErrors(error)
            console.log(error)
            return (
                errors
            )
        } finally {
            // setLoading(false)
        }
    }

    useEffect(() => {
        if (general.name != '') {
            fetchData();
        }
    }, [general.name])
    // useEffect(()=>{
    //     if()   
    // })

    return { errors, responseResult }
}

export default useAllPlaces