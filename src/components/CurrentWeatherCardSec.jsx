import { useEffect, useState } from "react"

export function CurrentWeatherCardSec( {weatherData} ) {

    return (
        <div className="bg-white shadow-lg rounded-lg min-w-96">
            <div className="bg-blue-500 text-white text-center py-4">
                <h2 className="text-2xl font-semibold">Current Weather Information</h2>
            </div>
            
            <div className="p-6">
                <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 rounded-full p-2">
                        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                             alt="Weather Icon"
                             className="w-20 h-20"
                        />
                    </div>
                </div>
                <div className="text-center mb-4">
                    <p className="text-xl font-medium text-gray-900">{weatherData.name}</p>
                    <p className="text-xl font-medium text-gray-700">{weatherData.weather[0].main}</p>
                 </div>
                <ul className="space-y-2">
                    
                    <li className="flex justify-between">
                        <span>Humidity: </span>
                        <span>{weatherData.main.humidity}</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Winds: </span>
                        <span>{Math.round(weatherData.wind.speed)}MPH</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Temperature: </span>
                        <span>{Math.round(weatherData.main.temp)}°F</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Feels Like: </span>
                        <span>{Math.round(weatherData.main.feels_like)}°F</span>
                    </li>
                    
                </ul>
            </div>

        </div>
    )
}