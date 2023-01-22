import { defaultClothingItems } from "../../utils/clothingItems";
import React from "react";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./app.css";
import { location, APIKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import {
  getForecastWeather,
  filterDataFromWeatherAPI,
} from "../../utils/weatherApi";
/* const sectretKey = ""; */
const App = () => {
  const [weatherData, setWeatherData] = React.useState({});
  /* const [clothingItems, setClothingItems] = React.useState({}); */
  const [activeModal, setActiveModal] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("item");
  };

  React.useEffect(() => {
    if (location.latitude && location.longitude) {
      getForecastWeather(location, APIKey)
        .then((data) => {
          setWeatherData(filterDataFromWeatherAPI(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);
  React.useEffect(() => {
    function handleEscape(evt) {
      if (evt.code === "Escape") {
        closeAllModals();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);
  /*  React.useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []); */
  React.useEffect(() => {
    function handleOverlay(evt) {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("popup")
      ) {
        closeAllModals();
      }
    }
    document.addEventListener("click", handleOverlay);
    return () => document.removeEventListener("click", handleOverlay);
  }, []);

  const closeAllModals = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__wrapper">
        <Header
          weatherData={weatherData}
          handleAddClick={() => setActiveModal("create")}
        />
        <Main
          weatherData={weatherData}
          defaultClothing={defaultClothingItems}
          handleCardClick={handleCardClick}
        />
        <Footer />
      </div>
      {activeModal === "create" && (
        <ModalWithForm
          title="New garment"
          name="new-card"
          onClose={closeAllModals}
          isOpen={activeModal === "create"}
          buttonText="add garment"
        >
          <label className="modal__label">
            <input
              type="text"
              name="link"
              id="place-link"
              className="modal__input modal__input_type_card-name"
              placeholder="Title"
              required
              minLength="1"
              maxLength="30"
            />
            <span className="modal__error" id="place-name-error"></span>
          </label>
          <label className="modal__label">
            <input
              type="url"
              name="link"
              id="place-link"
              className="modal__input modal__input_type_url"
              placeholder="Image URL"
              required
            />
            <span className="modal__error" id="place-link-error"></span>
          </label>
          <p>Select the weather type</p>
          <div className="modal__input modal__input_type_radio">
            <div>
              <input
                className="modal__input_radio"
                type="radio"
                id="choiceHot"
                name="weatherType"
                value="hot"
              />
              <label className="modal__label_radio" htmlFor="choiceHot">
                Hot
              </label>
            </div>
            <div>
              <input
                className="modal__input_radio"
                type="radio"
                id="choiceWarm"
                name="wetharType"
                value="warm"
              />
              <label className="modal__label_radio" htmlFor="choiceWarm">
                Warm
              </label>
            </div>
            <div>
              <input
                className="modal__input_radio"
                type="radio"
                id="choiceCold"
                name="wetharType"
                value="cold"
              />
              <label className="modal__label_radio" htmlFor="choiceCold">
                Cold
              </label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "item" && (
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "item"}
          onClose={closeAllModals}
        />
      )}
    </div>
  );
};

export default App;
