import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onCreateCard, isLoading }) {
  const [formValues, setFormValues] = useState({ name: "", link: "" });

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onCreateCard(formValues);
  }

  return(
    <PopupWithForm name="card" title="Новое место" button="Создать" isOpen={isOpen} isLoading={isLoading} onClose={onClose} onSubmit={handleSubmit} >
      <fieldset className="popup__input-container">
        <input className="popup__item popup__item_el_place" value={formValues.name || ''} onChange={handleChange} type="text" id="place-input" name="name" placeholder="Название" required minLength="2" maxLength="30"/>
        <span className="popup__item-error place-input-error"></span>
        <input className="popup__item popup__item_el_link" value={formValues.link || ''} onChange={handleChange} type="url" id="link-input" name="link" placeholder="Ссылка на картинку" required/>
        <span className="popup__item-error link-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
