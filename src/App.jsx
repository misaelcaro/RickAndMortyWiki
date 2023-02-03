
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ErrorMessage from './assets/components/ErrorMessage'
import LocationFilter from './assets/components/LocationFilter'
import { LocationInfo } from './assets/components/LocationInfo'
import ResidentList from './assets/components/ResidentList'
import getRandomNumber from './assets/utils/getRandomNumber'

function App() {
  const [location, setlocation] = useState()
  const [locationName, setLocationName] = useState("")
  const [showError, setshowError] = useState(false)



  useEffect(() => {
    const randomDimension = getRandomNumber()
    const URL = `https://rickandmortyapi.com/api/location/${randomDimension}`
    axios.get(URL)
      .then(res => setlocation(res.data))
      .catch(err => console.log(err))

  }, [])

  const getNewLocation = (URL, name) => {
    setLocationName(name)
    axios.get(URL)
      .then(res => setlocation(res.data))
      .catch(err => (err))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const dimensionSearch = (event.target.searchValue.value)
    if (dimensionSearch) {
      const URL = `https://rickandmortyapi.com/api/location/${dimensionSearch}`
      axios.get(URL)
        .then(res => setlocation(res.data))
        .catch(err => {
          setshowError(true)
          setTimeout(() => {
            setshowError(false)
          }, 2000)
          console.log(err)
        })

    } else {
      alert("Por favor ingrese un valor")
    }
  }
  const handelChangeImput = (event) => {
    setLocationName(event.target.value)
  }



  return (
   
    <div className="App">
      <img className="banner" src="https://cdn.shopify.com/s/files/1/0346/8063/5529/collections/rick-morty-collection-banner_1400x.jpg?v=1590095280" alt="banner rick and morty" />
      <form onSubmit={handleSubmit}>
        <div className="searcher">
        <input className="input" id="searchValue" value={locationName} type="text" onChange={handelChangeImput}
          placeholder="search dimension 1 to 126" />
        <button className="button-search" type="submit">Search</button>
        </div>
        {
          showError ? <ErrorMessage /> : ""
        }
      </form >

      
      <LocationFilter locationName={locationName} getNewLocation={getNewLocation} />
      <LocationInfo location={location} />
      <ResidentList location={location} />
    
    </div>
    
  )
}

export default App
