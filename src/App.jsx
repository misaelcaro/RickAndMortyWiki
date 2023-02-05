
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ErrorMessage from './assets/components/ErrorMessage'
import LocationFilter from './assets/components/LocationFilter'
import { LocationInfo } from './assets/components/LocationInfo'
import Pagination from './assets/components/Pagination'
import ResidentList from './assets/components/ResidentList'
import getRandomNumber from './assets/utils/getRandomNumber'



const RESIDENTS_PERPAGES = 10;

function App() {
  const [location, setlocation] = useState()
  const [locationName, setLocationName] = useState("")
  const [showError, setshowError] = useState(false)
  const [page, setPage] = useState(1)

  //funcion que se encarga de obtener un numero el residentes por pagina controlado por la const RESIDENTS_PERPAGE
  const pagination = () => {
    const maxLimit = page * RESIDENTS_PERPAGES;
    const minLimit = maxLimit - RESIDENTS_PERPAGES;
    const newResidents = location?.residents.slice(minLimit, maxLimit);
    return newResidents
  }


  
  
  
  const numbersPage = () => {
    const quantityPages = Math.ceil(location?.residents.length / RESIDENTS_PERPAGES);
  const arrayPages=[]
    for (let i = 1; i <= quantityPages; i++) {
      arrayPages.push(i)
    }
    return arrayPages
  }


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
          }, 500)
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

      <LocationFilter locationName={locationName} setPage={setPage} getNewLocation={getNewLocation} />
      <LocationInfo location={location} />
      <Pagination numbersPage={numbersPage} setPage={setPage}/>
      <hr />
      <br />
      <ResidentList location={location} pagination={pagination} />
      <Pagination numbersPage={numbersPage} setPage={setPage}/>
    </div>

  )
}

export default App
