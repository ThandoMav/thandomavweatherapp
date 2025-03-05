import { useState, useContext, useEffect } from "react"
import axios from "axios"
import { CurrentWeatherCard } from "./components/CurrentWeatherCard"
import { CurrentWeatherCardSec } from "./components/CurrentWeatherCardSec"
import { HourlyWeatherCard } from "./components/HourlyWeatherCard"
import { DailyWeatherCard } from "./components/DailyWeatherCard"
import { Map } from "./components/Map"
import { BsSearch } from 'react-icons/bs';
import { MapCoordinates } from './context/CoordinatesContext';
//import { CoordinatesContext } from './context/CoordinatesContext';
import { toast } from 'react-toastify';

const API_KEY = "0f140af0c51a5fd2890ecbbbe55d1203"

function App() {

  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0
  })

  const [mapCoordinates, setMapCoordinates] = useState({
    latitude: 0,
    longitude: 0
  })

//const { , city, setCity,   } = useCoordinatesContext();
const {handleLocationSearchhh} = useContext(MapCoordinates);
const {lat, setLat} = useContext(MapCoordinates);
const {long, setLong} = useContext(MapCoordinates);
const {city, setCity} = useContext(MapCoordinates);
const {weather, setWeather} = useContext(MapCoordinates);
const {loading, setLoading} = useContext(MapCoordinates);
  const [currentData, setCurrentData] = useState({})
  const [hourlyData, setHourlyData] = useState([])
  const [dailyData, setDailyData] = useState([])
  //const [loading, setLoading] = useState(true)
  const [timezone, setTimezone] = useState("")
  const [activeTab, setActiveTab] = useState("hourly")
  //const [weather, setWeather] = useState({});

  //const [city, setCity] = useState('');
  //const [lat, setLat] = useState({});
  //const [long, setLong] = useState({});

  
  const {handleLocationSearchFromMap} = useContext(MapCoordinates);
    
  useEffect(() => {
    handleLocationSearchFromMap();

  }, []);

/*
  async function handleLocationSearchh(e) {
    e.preventDefault()
    setLoading(true);
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`)
    
    setLoading(false)
    setMapCoordinates(coordinates)

    setWeather(response.data);
    //console.log(coordinates)
       console.log(response.data);
      //console.log(response.data)  
      //console.log(response.data.current)
      console.log(response.data.timezone)
      console.log(response.data.coord.lat)
      console.log(response.data.coord.lon)
      setLat({response.data.coord.lat})
      setLong(response.data.coord.lon)
      setTimezone(response.data.timezone)
  }
*/


  async function handleLocationSearch(e) {
    e.preventDefault()

    let response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${API_KEY}`)
    
    if(response){
      setCurrentData(response.data.current)
      setHourlyData(response.data.hourly)
      setDailyData(response.data.daily)
      setTimezone(response.data.timezone)
      setLoading(false)
      setMapCoordinates(coordinates)
      toast.success('Successful');
    }else{
      toast.error('Server Error');
    }
    
  }

  function handleChange(e) {
    setCoordinates({... coordinates, [e.target.name]: Number(e.target.value)})
  }

  function handleChangee(e) {
    setCity(e.target.value);
  }


 

  return (
    
<div className="w-screen h-screen flex flex-col bg-white">
{/*MAP 1*/}
  <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4 mt-16">Search Location Weather</h3>
  <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Find the weather, anywhere in the world!</h2>
    <form onSubmit={handleLocationSearchhh} className="space-y-4">
      <input 
      placeholder='Search city'
      onChange={handleChangee}
      type="text"
      required
      className="
        w-full p-3 border border-gray-300
        rounded-md focus:outline-none focus:ring-2
        focus:ring-blue-400"
        />
      
      <button type="submit" className="w-full
      bg-blue-500 text-white font-semibold
      py-3 rounded-md hover:bg-blue-600 flex align-center justify-center gap-2
      ">Search <BsSearch size={20} /> </button>
    </form>

  </div>
  {!loading &&
  <div>
    <div className="mt-16 flex flex-row justify-center space-x-12">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">Current Weather</h3>
        
        <CurrentWeatherCardSec weatherData={weather} />
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">Location Map</h3>
        <Map latitude={lat} longitude={long}/>
      </div>
    </div>
    
  </div>
  }

 {/*MAP 2*/}
 <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4 mt-16">Latitude/Longitude Search</h3>
  <div className="mx-auto p-6 bg-white shadow-md rounded-lg ">
    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Find the weather, anywhere in the world!</h2>
    <form onSubmit={handleLocationSearch} className="space-y-4">
      <input 
      placeholder={"Latitude"} 
      onChange={handleChange}
      name={"latitude"}
      type="number"
      step="0.0111"
      min="-90"
      max="90"
      required
      className="
        w-full p-3 border border-gray-300
        rounded-md focus:outline-none focus:ring-2
        focus:ring-blue-400"
        />
      <input 
      placeholder={"Longitude"} 
      onChange={handleChange}
      name={"longitude"}
      type="number"
      step="0.0111"
      min="-180"
      max="180"
      required
      className="
        w-full p-3 border border-gray-300
        rounded-md focus:outline-none focus:ring-2
        focus:ring-blue-400"
        />
      <button type="submit" className="w-full
      bg-blue-500 text-white font-semibold
      py-3 rounded-md hover:bg-blue-600
      ">Search</button>
    </form>

    <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10'>
          <form
            onSubmit={handleLocationSearchhh}
            className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'
          >
            <input 
      placeholder='Search city'
      onChange={handleChangee}
      type="text"
      required
      className="
        w-full p-3 border border-gray-300
        rounded-md focus:outline-none focus:ring-2
        focus:ring-blue-400"
        />
            <button onClick={handleLocationSearchhh}>
              <BsSearch size={20} /> 
            </button>
          </form>
        </div>

  </div>
  {!loading &&
  <div>
    <div className="mt-16 flex flex-row justify-center space-x-12">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">Current Weather</h3>
        <CurrentWeatherCardSec weatherData={weather} />
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">Location Map</h3>
        <Map latitude={mapCoordinates.latitude} longitude={mapCoordinates.longitude}/>
      </div>
    </div>
    <div className="flex justify-center space-x-4 mb-6 mt-24">
      <button onClick={() => setActiveTab("hourly")} className={`px-4 py-2 rounded-md ${activeTab === "hourly" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>Hourly Forecast</button>
      <button onClick={() => setActiveTab("daily")} className={`px-4 py-2 rounded-md ${activeTab === "daily" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>Daily Forecast</button>
    </div>
    <div className="flex justify-center mb-48">
      {activeTab === "hourly" && (
        <div className="overflow-x-scroll flex w-10/12 space-x-4 p-4">
          {hourlyData.map((hour, index) => (
            <HourlyWeatherCard hour={hour} key={index}/>
          ))}
        </div>
      )}
      {activeTab === "daily" && (
        <div className="overflow-x-scroll flex w-10/12 space-x-4 p-4">
          {dailyData.map((day, index) => (
            <DailyWeatherCard day={day} key={index}/>
          ))}
        </div>
      )}
    </div>
  </div>
  }
 

</div>
  )
}

export default App
