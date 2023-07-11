
import "./ClothesSection.css";
import React, { useContext } from "react";

import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
function ClothesSection({
  clothingItems,
  handleCardClick,
  isLoggedIn,
  openModal,
  handleLikeClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="profile__clothes-section">
      <div className="profile__clothes-section-header">
        <h2 className="profile__clothes-section-title">Your items</h2>
        <button
          className="profile__add-clothes-btn"
          type="button"
          onClick={openModal}
        >
          + Add new
        </button>
      </div>
      <ul className="profile__clothes-section-items">
        {clothingItems.map((item) => (
          <ItemCard
          clothingOption={item}
          key={item._id}
            isOpen="false"
            clothingChoice={item}
            onClick={() => handleCardClick(item)}
            isLoggedIn={isLoggedIn}
            handleLikeClick={() => {
              handleLikeClick(
                item._id,
                item.likes.includes(currentUser._id),
                currentUser
              );
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
