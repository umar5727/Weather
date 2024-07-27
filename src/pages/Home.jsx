import { useContext, useEffect, useState } from 'react'
// import LocationContext from '../context/LocationContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faSearch, faSun } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import LocationContext from '../context/LocationContext'
import { Link } from 'react-router-dom'
import Form from './Form'
import useAllPlaces from '../hooks/useAllPlaces'




function Home() {
    const { general, setGeneral } = useContext(LocationContext)
    const { cityData, setCityData } = useContext(LocationContext)
    console.log('\n cityData: ', cityData)
    const { errors, responseResult } = useAllPlaces()
    console.log(errors)

    console.log(responseResult)





    const [search, setSearch] = useState('')
    const handleChange = (event) => {
        setSearch(event.target.value)
    }
    const handleClick = async (e) => {
        e.preventDefault();
        const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '09f4034b4dmsh23f49b316d34454p1a1b3bjsn2d34b4a0e0f8',
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(`${url}${search} `, options);
            const result = await response.json();
            const { temp_c, temp_f, last_updated, cloud } = result.current
            const { name, region } = result.location

            const locationData = { temp_c, temp_f, last_updated, name, region, cloud }

            setGeneral(locationData)
            setCityData(null)
        } catch (error) {
            console.error(error);
        }
    }
    var className
    if (general.cloud > 20 && general.cloud < 50) {
        className = 'text-white'
    } else if (general.cloud >= 50) {
        className = "text-gray-700"
    } else {
        className = 'hidden'
    }


    const defaultSearch = async () => {
        const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '09f4034b4dmsh23f49b316d34454p1a1b3bjsn2d34b4a0e0f8',
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(`${url}aurangabad `, options);
            const result = await response.json();
            const { temp_c, temp_f, last_updated, cloud } = result.current
            const { name, region } = result.location

            const locationData = { temp_c, temp_f, last_updated, name, region, cloud }

            setGeneral(locationData)
        } catch (error) {
            console.error(error);
        }
    }

    //addplace starts

    const addPlaceClick = async (e) => {
        e.preventDefault();
        // AddPlace()
    }

    useEffect(() => {
        if (!general.name) {
            defaultSearch(0)
        }


    }, [general])

    useEffect(() => {
        console.log(responseResult)
    }, [responseResult])
    return (
        <main className='py-5 '>


            <div className="flex flex-col justify-center items-center w-screen h-screen px-20 gap-5 text-white">
                <section className="relative w-96">
                    <form onSubmit={handleClick} >

                        <input
                            type="text"
                            className="text-white font-semibold rounded-md w-full text-lg p-2 pr-14 focus-visible:outline-none bg-blue-400/30 backdrop-filter backdrop-blur-sm border border-blue-400/30 shadow-lg "
                            value={search}
                            onChange={handleChange}
                        />
                        <motion.button
                            type='submit'
                            className="group bg-blue-700 h-full px-4 rounded-e-md absolute right-0 top-0"
                            whileTap={{ scale: 0.9 }}

                        // onClick={handleClick}

                        >

                            <FontAwesomeIcon icon={faSearch} className="duration-300 group-hover:scale-150" />
                        </motion.button>
                    </form>
                </section>
                {/* search ends  */}

                <section className="w-full lg:w-2/3 h-1/2 bg-blue-400/20 backdrop-filter backdrop-blur-lg  rounded-xl p-10  flex justify-between  border border-blue-400/40 ">
                    <div className='w-full  flex justify-between px-10 ' >

                        <div >

                            <div className='text-6xl font-bold'>
                                {general.name}
                            </div>
                            {/* city name end s */}
                            <div className='text-lg font-semibold'>

                                {general.region}
                            </div>
                            {/* region ends */}
                            <div className='font-medium'>
                                {general.last_updated?.slice(0, 10)}
                            </div>
                            {/* date ends  */}
                        </div>
                        {/* left ends  */}
                        <div className='flex flex-col justify-center items-center absolute  top-36 left-56'>

                            <FontAwesomeIcon icon={faCloud} className={`${className} h-40 aspect-video z-40 `} />
                            {
                                general.cloud < 60 ?
                                    // <img src="sun-icon.svg" alt="" className='w-40 absolute -top-10 right-0' />
                                    ''
                                    :
                                    <FontAwesomeIcon icon={faCloud} className={`${className} h-28 absolute -top-2 right-0`} />
                            }
                            <div className='text-lg font-bold capitalize text-center'>

                                {
                                    general.cloud < 60 ? 'Clear' : 'cloudy'
                                }
                            </div>
                        </div>
                        {/* logo ends */}
                        <div className='flex flex-col'>

                            <div className=' text-4xl '>
                                <div className='flex  justify-end items-center relative pr-3 pt-2 '>

                                    {general.temp_f}
                                    <div className='text-lg font-bold absolute top-0 right-0 '>F</div>
                                </div>
                            </div>
                            <div className='flex-grow flex justify-center items-end leading-none text-[150px] '>
                                <div className='relative pr-5 tracking-tight'>

                                    {general.temp_c}
                                    <div className='w-5 h-5 border-[5px] rounded-full text-white border-white absolute top-0 right-0'>

                                    </div>
                                </div>
                            </div>
                            {/* temp in deg end  */}
                        </div>

                    </div>

                </section>
                {/* main section ends  */}
                <section className="w-full">
                    <div className='flex justify-center text-2xl  mb-2'>
                        <h2 className='text-black font-bold bg-blue-400/20 py-4 px-20 rounded-lg backdrop-filter backdrop-blur-sm w-fit shadow-lg hover:bg-green-400/20 '>

                            Explore Tourist Places in {general.name}
                        </h2>

                    </div>
                    <div className='grid grid-cols-5 w-full gap-10 items-center'>


                        {
                            cityData?.map((field) => (

                                <div
                                    className="h-fit w-full bg-blue-500/10 backdrop-filter backdrop-blur-md  border border-blue-600/20  rounded-md  flex flex-col justify-center items-center shadow-xl  "
                                    key={field.placeName}
                                >
                                    <img src={field.placeImage} alt="" />
                                    <div className="  h-full text-white text-xl font-bold capitalize py-2">
                                        {field.placeName}
                                    </div>
                                </div>
                            ))

                        }
                        {/* first card ends */}
                        <motion.button

                            className='text-black text-2xl font-bold bg-blue-400/20 py-4 w-full rounded-lg backdrop-filter backdrop-blur-sm shadow-lg h-fit self-center hover:bg-green-400/20'
                            whileTap={{ scale: 0.9 }}
                            onClick={addPlaceClick}
                        >
                            {/* <Link to='#'> */}
                            Add Place
                            {/* </Link> */}
                        </motion.button>
                    </div>
                </section>

            </div >
            <Form />
        </main>


    );
}

export default Home
