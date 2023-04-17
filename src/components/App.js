import React, { useState } from 'react';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({})
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className="page">
      <Header />
      <Main isEditAvatarPopupOpen={handleEditAvatarClick} isEditProfilePopupOpen={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} onCardClick={handleCardClick}/>
      <PopupWithForm name="profile" title="Редактировать профиль" children={(
        <fieldset className="popup__input-container">
          <input className="popup__item popup__item_el_name" type="text" id="name-input" name="name" placeholder="Имя" required minLength="2" maxLength="40"/>
          <span className="popup__item-error name-input-error"></span>
          <input className="popup__item popup__item_el_about" type="text" id="about-input" name="about" placeholder="О себе" required minLength="2" maxLength="200"/>
          <span className="popup__item-error about-input-error"></span>
        </fieldset>
      )} button="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
      <PopupWithForm name="card" title="Новое место" children={(
        <fieldset className="popup__input-container">
          <input className="popup__item popup__item_el_place" type="text" id="place-input" name="name" placeholder="Название" required minLength="2" maxLength="30"/>
          <span className="popup__item-error place-input-error"></span>
          <input className="popup__item popup__item_el_link" type="url" id="link-input" name="link" placeholder="Ссылка на картинку" required/>
          <span className="popup__item-error link-input-error"></span>
        </fieldset>
      )} button="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
      <PopupWithForm name="avatar" title="Обновить аватар" children={(
        <fieldset className="popup__input-container popup__input-container_for_avatar">
          <input className="popup__item popup__item_el_link" type="url" id="avatar-input" name="link" placeholder="Ссылка на картинку" required/>
          <span className="popup__item-error avatar-input-error"></span>
        </fieldset>
      )} button="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm name="delete" title="Вы уверены?" button="Да" onClose={closeAllPopups} />
      <Footer />
    </div>
  );
}

export default App;
