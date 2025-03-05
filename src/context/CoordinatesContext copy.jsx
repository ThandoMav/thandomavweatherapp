import React,{ createContext, useContext, useState } from "react";


const CoordinatesInfo = createContext();


export const CoordinatesContext = ({ children }) => {

  const [loading, setLoading] = useState(true);

  const [long, setLong] = useState({});
  const [lat, setLang] = useState({});
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});

const API_KEY = "0f140af0c51a5fd2890ecbbbe55d1203"

  async function handleLocationSearchFromMap(e) {
    e.preventDefault()
    setLoading(true);
    let response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid={API_key}`)
    setWeather(response.data);
    setCity(response.data.name);
    setLoading(false)
  }

  
  async function handleLocationSearchhh(e) {
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
      setLat(response.data.coord.lat)
      setLong(response.data.coord.lon)
      setTimezone(response.data.timezone)
  } 


  const shareWithChildren = {
    long, setLong,
    lat, setLang,
    loading, setLoading,
    city, setCity,
    weather, setWeather,
    handleLocationSearchFromMap,
    handleLocationSearchhh
  };


  return (
    <CoordinatesInfo.Provider value={shareWithChildren}>
      {
        children
      }
    </CoordinatesInfo.Provider>
  )
}

export const useCoordinatesContext = () => useContext(CoordinatesInfo);