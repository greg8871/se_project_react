import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import ItemModal from "../ItemModal/ItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
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
import { register, authorize, getUser, updateUser } from "../../utils/auth";
import * as api from "../../utils/Api";
const App = () => {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [showFormError, setShowFormError] = useState(false);
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      setIsLoggedIn(true);
      getUser(token)
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchClothingItems();
  }, []);

  const closeModal = () => {
    setActiveModal("");
  };
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleToggleModal = () => {
    activeModal === "login"
      ? setActiveModal("register")
      : setActiveModal("login");
  };

  const fetchClothingItems = () => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => console.log(err));
  };

  const handleFormError = () => {
    setShowFormError(false);
  const handleCardDelete = () => {
    api.deleteItem(selectedCard.id)
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
    const apiMethod = isLiked ? api.removeCardLike : api.addCardLike;

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
    api.getItems()
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
    api.addItem(name, imageUrl, weatherType)
      .then((item) => {
        const items = [item, ...clothingItems];
        setClothingItems(items);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
 

  const handleRegistration = ({ name, avatar, email, password }) => {
    return register({ name, avatar, email, password })
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleAuthorization = (email, password) => {
    setIsLoading(true);
    setShowFormError(false);
    authorize(email, password)
      .then(() => {
        setIsLoggedIn(true);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        setShowFormError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleProfileUpdate = ({ name, avatar, token }) => {
    setIsLoading(true);
    updateUser(name, avatar, token)
      .then((res) => {
        setCurrentUser(res);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            weatherData={weatherData}
            openAddModal={() => {
              setActiveModal("add");
            }}
            openLoginModal={() => {
              setActiveModal("login");
            }}
            openRegisterModal={() => {
              setActiveModal("register");
            }}
            isLoggedIn={isLoggedIn}
          />
          <Switch>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/profile">
              <Profile
                currentUser={currentUser}
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleCardClick={handleCardClick}
                handleLikeClick={handleLikeClick}
                openAddModal={() => {
                  setActiveModal("add");
                }}
                openEditModal={() => {
                  setActiveModal("update");
                }}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                isLoading={isLoading}
              />
            </ProtectedRoute>
            <Route path={"/"}>
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleCardClick={handleCardClick}
                handleLikeClick={handleLikeClick}
                isLoggedIn={isLoggedIn}
              />
            </Route>
          </Switch>
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
           <LoginModal
            isOpen={activeModal === "login"}
            type={"login"}
            onCloseModal={closeModal}
            handleToggleModal={handleToggleModal}
            handleLogin={handleAuthorization}
            handleProfileUpdate={handleProfileUpdate}
            showFormError={showFormError}
            setShowFormError={handleFormError}
            isLoading={isLoading}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            type={"register"}
            onCloseModal={closeModal}
            handleRegistration={handleRegistration}
            handleToggleModal={handleToggleModal}
            showFormError={showFormError}
            setShowFormError={handleFormError}
            isLoading={isLoading}
          />

<EditProfileModal
            isOpen={activeModal === "update"}
            type={"update"}
            onCloseModal={closeModal}
            currentUser={currentUser}
            handleProfileUpdate={handleProfileUpdate}
            isLoading={isLoading}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
