import "./Profile.css";
import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({ clothingItems, openModal, handleCardClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        openModal={openModal}
        handleCardClick={handleCardClick}
      />
    </div>
  );
}
export default Profile;
