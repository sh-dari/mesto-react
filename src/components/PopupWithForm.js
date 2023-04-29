function PopupWithForm({ isOpen, name, onClose, onSubmit, button, children, title }) {
  const isOpened = isOpen ? "popup_opened" : "";
  return(
    <div className={`popup popup_for_${name} ${isOpened}`}>
      <div className={`popup__content popup__content_for_${name}`}>
        <form className="popup__container" name={`form_${name}`} onSubmit={onSubmit} noValidate>
          <button type="button" className={`popup__close popup__close_for_${name}`} onClick={onClose}></button>
          <h2 className="popup__heading">{title}</h2>
          {children}
          <button type="submit" className={`popup__button popup__button_for_${name}`} value={button}>{button || 'Сохранить'}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
