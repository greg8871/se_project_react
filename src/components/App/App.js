import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import ItemModal from "../ItemModal/ItemModal";
import { getItems, addItem, deleteItem } from "../../utils/Api";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import "./App.css";
import { location, APIKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import {
  getForecastWeather,
  filterDataFromWeatherAPI,
} from "../../utils/weatherApi";

import * as api from "../../utils/Api";
const App = () => {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  /*  const baseUrl = "http://localhost:3001"; */
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("item");
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getForecastWeather(location, APIKey)
        .then((data) => {
          setWeatherData(filterDataFromWeatherAPI(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    function handleEscape(evt) {
      if (evt.code === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    function handleOverlay(evt) {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("confirm-modal")
      ) {
        closeModal();
      }
    }
    document.addEventListener("click", handleOverlay);
    return () => document.removeEventListener("click", handleOverlay);
  }, []);

  const closeModal = () => {
    setActiveModal("");
  };
  const handleCardDelete = () => {
    Api;
    deleteItem(selectedCard.id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item.id !== selectedCard.id)
        );
        setSelectedCard({});
        closeModal();
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteClick = () => {
    setActiveModal("confirm");
  };
  const handleLikeClick = (cardId, isLiked) => {
    const apiMethod = isLiked ? Api.removeCardLike : Api.addCardLike;

    apiMethod(cardId)
      .then((updatedCard) => {
        const updatedItems = clothingItems.map((item) => {
          if (item._id === updatedCard._id) {
            return updatedCard;
          }
          return item;
        });
        setClothingItems(updatedItems);
      })
      .catch((err) => console.log(err));
  };
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
  const fetchClothingItems = () => {
    Api.getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchClothingItems();
  }, []);
  const handleAddItemSubmit = (name, imageUrl, weatherType) => {
    setIsLoading(true);
    Api;
    addItem(name, imageUrl, weatherType)
      .then((item) => {
        const items = [item, ...clothingItems];
        setClothingItems(items);
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            weatherData={weatherData}
            openModal={() => {
              setActiveModal("add");
            }}
          />
          <Route exact path={"/"}>
            <Main
              weatherData={weatherData}
              clothingItems={clothingItems}
              handleCardClick={handleCardClick}
              handleLikeClick={handleLikeClick}
            />
          </Route>
          <Route path={"/profile"}>
            <Profile
              weatherData={weatherData}
              clothingItems={clothingItems}
              handleCardClick={handleCardClick}
              handleLikeClick={handleLikeClick}
              openModal={() => {
                setActiveModal("add");
              }}
            />
          </Route>
          <Footer />

          <AddItemModal
            isOpen={activeModal === "add"}
            type={"add"}
            onAddItem={handleAddItemSubmit}
            onClose={closeModal}
          />

          <ItemModal
            isOpen={activeModal === "item"}
            type={"item"}
            card={selectedCard}
            onClose={closeModal}
            onDeleteClick={handleDeleteClick}
          />

          <ConfirmationModal
            isOpen={activeModal === "confirm"}
            type={"confirm"}
            onClose={closeModal}
            onCardDelete={handleCardDelete}
          />
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
    /* </CurrentUserContext.Provider> */
  );
};

export default App;
