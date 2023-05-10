import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
function ItemModal({ isOpen, name, card, onClose, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  // const isOwn = card.owner === currentUser._id;

  /* const popup__delete-btn  onClick={onDeleteClick}> */
  // const item = `item-modal__delete-btn ${
  //   isOwn ? "item-modal__delete-btn_visible" : "item-modal__delete-btn_hidden"
  // }`;
  const item = "";
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
          <button className={item} onClick={onDeleteClick}>
            Delete item
          </button>
          <p className="popup__weather">Weather: {card?.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
