import React from "react";
import "../Main/main.css";
import ItemCard from "../ItemCard/itemcard";
import WeatherCard from "../WeatherCard/weathercard";

function Main({ weatherData, cards, onCardClick }) {
  const actualWeather = weatherData.temperature;

  const weatherType = () => {
    if (actualWeather >= 86) {
      return "hot";
    } else if (actualWeather >= 66 && actualWeather <= 85) {
      return "warm";
    } else if (actualWeather <= 65) {
      return "cold";
    }
  };
}
