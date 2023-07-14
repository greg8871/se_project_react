import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
function ItemModal({ isOpen, name, card, onClose, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card?.owner === currentUser._id;

  const popupDeleteBtnClassName = `popup__delete-btn ${
    isOwn ? "popup__delete-btn_visible" : "popup__delete-btn_hidden"
  }`;

  return (
    <div
      className={
        isOpen ? `popup modal_name_${name}` : `modal_name_${name} popup_closed`
      }
    >
      <div className="popup__body">
        <button className="popup__close-btn" onClick={onClose} />
        <img className="popup__image" src={card?.imageUrl} alt={card?.name} />
        <div className="popup__info">
          <h3 className="popup__name">{card?.name}</h3>
          <button className={popupDeleteBtnClassName} onClick={onDeleteClick}>
            Delete item
          </button>
          <p className="popup__weather">Weather: {card?.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
