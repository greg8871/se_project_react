import "./Profile.css";
import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({ openModal, handleCardClick, currentUser, handleLogout, openEditModal }) {
  const clothingItems = clothingItems.filter(
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
        clothingItems={clothingItems}
        openModal={openModal}
        handleCardClick={handleCardClick}
      />
    </div>
  );
}
export default Profile;
