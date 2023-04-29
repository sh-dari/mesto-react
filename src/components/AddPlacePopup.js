import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onCreateCard, isLoading }) {
  const [place, setPlace] = useState('');
  const [link, setLink] = useState('');

  const handleChangePlace = (evt) => {
    setPlace(evt.target.value);
  }
  const handleChangeLink = (evt) => {
    setLink(evt.target.value);
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onCreateCard({
      link,
      name: place,
    });
  }

  return(
    <PopupWithForm name="card" title="Новое место" button="Создать" isOpen={isOpen} isLoading={isLoading} onClose={onClose} onSubmit={handleSubmit} >
      <fieldset className="popup__input-container">
        <input className="popup__item popup__item_el_place" value={place || ''} onChange={handleChangePlace} type="text" id="place-input" name="name" placeholder="Название" required minLength="2" maxLength="30"/>
        <span className="popup__item-error place-input-error"></span>
        <input className="popup__item popup__item_el_link" value={link || ''} onChange={handleChangeLink} type="url" id="link-input" name="link" placeholder="Ссылка на картинку" required/>
        <span className="popup__item-error link-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
