import "./ItemCard.css";

const ItemCard = ({ clothingChoice, onClick }) => {
  return (
    <li
      key={clothingChoice._id.toString()}
      className="item__card"
      onClick={onClick}
    >
      <h5 className="item-card__title">{clothingChoice.name}</h5>
      <img
        className="item-card__image"
        src={clothingChoice.imageUrl}
        alt={clothingChoice.name}
      />
    </li>
  );
};

export default ItemCard;
