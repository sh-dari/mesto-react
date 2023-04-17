function ImagePopup(props) {
  const isOpen = Object.keys(props.card).length ? "popup_opened" : "";
  return(
    <div className={`popup popup_for_image ${isOpen}`}>
      <div className="popup__content popup__content_for_image">
        <button type="button" className="popup__close" onClick={props.onClose}></button>
        <img className="popup__img" src={props.card.link} alt="Увеличенная карточка"/>
        <p className="popup__text">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
