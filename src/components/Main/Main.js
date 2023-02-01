import "./Main.css";
import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, defaultClothing, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentWeather =
    currentTemperatureUnit === "F"
      ? weatherData?.temperature?.F
      : weatherData?.temperature?.C;

  const HOT_WEATHER = 86;
  const COLD_WEATHER = 64;

  const getWeatherType = React.useMemo(() => {
    if (currentWeather >= HOT_WEATHER) {
      return "hot";
    } else if (
      currentWeather >= COLD_WEATHER - 1 &&
      currentWeather <= HOT_WEATHER - 1
    ) {
      return "warm";
    } else if (currentWeather <= COLD_WEATHER) {
      return "cold";
    }
  }, [currentWeather]);

  const clothingChoices = React.useMemo(
    () => defaultClothing.filter((card) => card.weather === getWeatherType),
    [getWeatherType]
  );
  console.log(clothingChoices);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} currentWeather={currentWeather} />
      <h3 className="main__header">
        Today is{` ${currentWeather}°${currentTemperatureUnit} `} / You may want
        to wear:
      </h3>
      <ul className="main__gallery">
        {clothingChoices.map((item) => (
          <ItemCard
            isOpen="false"
            clothingChoice={item}
            key={item._id}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </ul>
    </main>
  );
}
export default Main;
