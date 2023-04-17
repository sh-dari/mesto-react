function ImagePopup({ card, onClose }) {
  const isOpen = Object.keys(card).length ? "popup_opened" : "";
  return(
    <div className={`popup popup_for_image ${isOpen}`}>
      <div className="popup__content popup__content_for_image">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img className="popup__img" src={card.link} alt="Увеличенная карточка"/>
        <p className="popup__text">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
