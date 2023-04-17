function PopupWithForm(props) {
  const isOpen = props.isOpen ? "popup_opened" : "";
  return(
    <div className={`popup popup_for_${props.name} ${isOpen}`}>
      <div className={`popup__content popup__content_for_${props.name}`}>
        <form className="popup__container" name={`form_${props.name}`} noValidate>
          <button type="button" className={`popup__close popup__close_for_${props.name}`} onClick={props.onClose}></button>
          <h2 className="popup__heading">{props.title}</h2>
          {props.children}
          <button type="submit" className={`popup__button popup__button_for_${props.name}`} value={props.button}>{props.button}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
