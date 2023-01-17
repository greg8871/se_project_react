import { defaultClothingItems } from "../../utils/clothingItems";
import ItemModal from "../ItemModal/itemmodal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./App.css";
import { location, APIKey } from "../../utils/constants";
import Header from "../Header/header";
import Main from "../Main/main";
import Footer from "../Footer/footer";
import {
  getForecastWeather,
  filterDataFromWeatherAPI,
} from "../../utils/weatherApi";

const App = () => {
  const [weatherData, setWeatherData] = React.useState({});
  const [clothingItems, setClothingItems] = React.useState({});
  const [activeModal, setActiveModal] = useState();
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("item");
  };
  const closeAllModals = () => {
    setActiveModal();
  };
  React.useEffect(() => {
    if (location.latitude && location.longitude) {
      getForecastWeather(location, sectretKey)
        .then((data) => {
          setWeatherData(filterDataFromWeatherAPI(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);
  React.useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);
  return (
    <div className="page">
      <div className="page__wrapper">
        <Header
          weatherData={weatherData}
          handleAddClick={() => setActiveModal("create")}
        />
        <Main
          weatherData={weatherData}
          cards={clothingItems}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>
      {activeModal === "create" && (
        <ModalWithForm
          title="New garment"
          name="new-card"
          onClose={closeAllModals}
        >
          <label className="modal__label">
            <input
              type="text"
              name="link"
              id="place-link"
              className="modal__input modal__input_type_card-name"
              placeholder="Title"
              required
              minLenght="1"
              maxLenght="30"
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
      {activeModal === "preview" && (
        <ItemModal card={selectedCard} onClose={closeAllModals} />
      )}
    </div>
  );
};

export default App;
