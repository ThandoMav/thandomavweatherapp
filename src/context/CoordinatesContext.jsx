import React,{ createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import { toast } from 'react-toastify';
export const MapCoordinates = createContext();


export const MapCoordinatesProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);

  const [long, setLong] = useState({});
  const [lat, setLat] = useState({});
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});

const API_KEY = "0f140af0c51a5fd2890ecbbbe55d1203"


  async function handleLocationSearchFromMap(e) {
    e.preventDefault()
    setLoading(true);
    let response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid={API_key}`)
    
    if(response){
      setWeather(response.data);
      setCity(response.data.name);
      setLoading(false)
      toast.success('Location found');
    }else{
      toast.error('Server Error');
    }
  }
/*

  useEffect(() => {
    const handleLocationSearchFromMap = async (e) => {
      e.preventDefault()
      setLoading(true);
      let response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid={API_key}`)
      setWeather(response.data);
      setCity(response.data.name);
      setLoading(false)
    }
    handleLocationSearchFromMap();

  }, []);
*/
  
  async function handleLocationSearchhh(e) {
    e.preventDefault()
    setLoading(true);
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`)
    if(response){
      toast.success('Location found');
    }else{
      toast.error('Server Error');
    }
    setLoading(false)
    //setMapCoordinates(coordinates)

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
      //setTimezone(response.data.timezone)
  } 


  const shareWithChildren = {
    long, setLong,
    lat, setLat,
    loading, setLoading,
    city, setCity,
    weather, setWeather,
    handleLocationSearchFromMap,
    handleLocationSearchhh
  };


  return (
    <MapCoordinates.Provider value={shareWithChildren}>
      {
        children
      }
    </MapCoordinates.Provider>
  )
}
