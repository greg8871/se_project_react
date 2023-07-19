import "./Profile.css";
import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({clothingItems, handleCardClick, openAddModal, handleLikeClick, currentUser, handleLogout, openEditModal, isLoggedIn, }) {
  
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
        openAddModal={openAddModal}
        handleCardClick={handleCardClick}
        handleLikeClick={handleLikeClick}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}
export default Profile;
