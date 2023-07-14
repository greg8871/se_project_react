import "./Profile.css";
import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({ openModal, clothingItems, handleCardClick, currentUser, handleLogout, openEditModal }) {
  const myClothes = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );
  return (
    <div className="profile">
      <SideBar 
       currentUser={currentUser}
       handleLogout={handleLogout}
       openEditModal={openEditModal}
       />
      <ClothesSection
        clothingItems={myClothes}
        openModal={openModal}
        handleCardClick={handleCardClick}
      />
    </div>
  );
}
export default Profile;
