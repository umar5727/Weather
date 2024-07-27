import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import LocationContext from '../context/LocationContext'
import AddPlace from '../fetch/AddPlace'
import { server_url } from '../../constants'
import useAllPlaces from '../hooks/useAllPlaces'
const Form = () => {
    const [placeName, setPlaceName] = useState('')
    const [details, setDetails] = useState('')
    const [Images, setImages] = useState('')
    const [errors, setErrors] = useState("")
    const { general } = useContext(LocationContext)

    const { responseResult } = useAllPlaces()

    const handleSubmit = async (e) => {
        const formData = new FormData();
        formData.append('placeName', placeName);
        formData.append('details', details);
        formData.append('placeImage', Images);
        formData.append('city', general.name);
        e.preventDefault();

        const options = {
            method: 'POST',
            mode: 'cors',
            // headers: { "Content-Type": "multipart/form-data" },
            body: formData
        };
        try {
            const response = await fetch(`${server_url}/places/addPlace`, options)
            if (response.status >= 400) {
                const errorData = await response.json();
                throw new Error(errorData.message)
            }
            const { placeData } = response.json();
            setCityData(placeData)

        } catch (error) {
            setErrors(error.message)
            console.log(error.message)
            return (
                errors
            )
        } finally {

            setDetails('')
            setImages('')
            setPlaceName('')

            console.log(responseResult)

        }

        console.log(placeData)
        return (placeData.message)
        // console.log("form form", response)
    }
    return (
        <form onSubmit={handleSubmit}>

            <div className='flex flex-col md:w-[450px] lg:w-1/3 mx-auto items-center justify-center gap-10 text-white font-semibold rounded-md text-lg  focus-visible:outline-none bg-blue-400/30 backdrop-filter backdrop-blur-sm border border-blue-400/30 shadow-lg p-16'>

                <label className='w-full'>

                    <div className='text-xl font-bold'>Place Name</div>
                    <input type="text"
                        className='w-full bg-white/20 backdrop-filter backdrop-blur-lg p-2 text-lg focus-visible:outline-none shadow-lg rounded-md transition-colors duration-300 hover:bg-green-500/10'
                        value={placeName}
                        onChange={(e) => setPlaceName(e.target.value)}
                    />

                </label>
                <label className='w-full'>
                    <div className='text-xl font-bold'>
                        Details

                    </div>

                    <textarea rows={10} className='w-full bg-white/20 backdrop-filter backdrop-blur-lg p-2 text-sm focus-visible:outline-none shadow-lg rounded-md transition-colors duration-300 hover:bg-green-500/10'
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    >

                    </textarea>
                </label>
                <div className="flex gap-2 items-center w-full">
                    <div className="w-36 aspect-video ">
                        {Images ? (
                            <img src={URL.createObjectURL(Images)} className="w-full h-full rounded-md
                            " />
                        ) : (
                            <img src="userDemo.jpg" />
                        )}
                    </div>
                    <input
                        type="file"
                        id="Images"
                        name="Images"
                        onChange={(event) => setImages(event.target.files[0])}
                        className="hidden"
                    />
                    <label
                        htmlFor="Images"
                        className={!Images ? "" : "flex flex-col gap-1 items-center justify-center"}
                    >
                        {

                            Images ? <span>{Images.name} </span> : <></>
                        }
                        <motion.span className="cursor-pointer dark:bg-primary-dark  hover:bg-primary  dark:hover:bg-primary py-1 px-4 rounded-md font-bold border border-primary  bg-white/10 backdrop-filter backdrop-blur-sm shadow-lg  transition-colors duration-300 hover:bg-green-500/10"

                        >
                            Choose Photo
                        </motion.span>

                    </label>
                </div>
                <motion.button
                    type='submit'
                    className='w-full py-2 px-8 text-white bg-white/10 backdrop-filter backdrop-blur-sm font-bold text-xl shadow-lg transition-colors duration-300 hover:bg-green-500/10'
                    whileTap={{ scale: 0.9 }}
                >
                    Submit
                </motion.button>
            </div>
        </form>
    )
}

export default Form