import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, isLoading, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  }
  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return(
    <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={isLoading} isValid={true} >
      <fieldset className="popup__input-container">
        <input className="popup__item popup__item_el_name" value={name || ''} onChange={handleChangeName} type="text" id="name-input" name="name" placeholder="Имя" required minLength="2" maxLength="40"/>
        <span className="popup__item-error name-input-error"></span>
        <input className="popup__item popup__item_el_about" value={description || ''} onChange={handleChangeDescription} type="text" id="about-input" name="about" placeholder="О себе" required minLength="2" maxLength="200"/>
        <span className="popup__item-error about-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
