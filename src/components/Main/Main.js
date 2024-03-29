import React, { useContext } from "react";
import "./Main.css";
import CurrentUserContext from "../../Contexts/CurrentTemperatureUnitContext";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, clothingItems, handleCardClick, handleLikeClick,
  isLoggedIn, }) {
    const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
    const currentUser = useContext(CurrentUserContext);
  
    const currentTemp =
      currentTemperatureUnit === "F"
        ? weatherData?.temperature?.F
        : weatherData?.temperature?.C;

  const HOT_WEATHER = 86;
  const COLD_WEATHER = 64;

  const getWeatherType = () => {
    if (currentTemp >= HOT_WEATHER) {
      return "hot";
    } else if (
      currentTemp >= COLD_WEATHER - 1 &&
      currentTemp <= HOT_WEATHER - 1
    ) {
      return "warm";
    } else if (currentTemp <= COLD_WEATHER) {
      return "cold";
    }
  };
  
  function filterClothing(card) {
    return card.weather === getWeatherType();
  }

     const clothingOptions = clothingItems.filter(filterClothing);
  

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} currentTemp={currentTemp} />
      <h3 className="main__header">
        Today is
        {` ${currentTemp}°${currentTemperatureUnit} `} / You may want to wear:
      </h3>
      <ul className="main__gallery">
        {clothingOptions.map((item) => (
          <ItemCard
            isOpen="false"
            clothingOption={item}
            key={item._id}
            handleCardClick={() => handleCardClick(item)}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            handleLikeClick={handleLikeClick}
                   
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;