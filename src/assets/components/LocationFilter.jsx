import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

const LocationFilter = ({ locationName, getNewLocation }) => {
    const [locationsOptions, setlocationsOptions] = useState()

    useEffect(() => {
        if(!locationName){
            setlocationsOptions()
            return
        }
        const URL = (`https://rickandmortyapi.com/api/location?name=${locationName}`)
        axios.get(URL)
            .then(res => setlocationsOptions(res.data.results))
            .catch(err => (err))

    }, [locationName])

    return (
        <ul className="search-list">
            {
                locationsOptions?.map(locationsOption => <li className="search-list_items" onClick={() => getNewLocation(locationsOption.
                    url, locationsOption.name )} key={locationsOption.url}>{locationsOption.name}</li>)
            }
        </ul>
    )
}

export default LocationFilter