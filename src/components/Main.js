import { useState, useEffect } from 'react';
import api from "../utils/Api.js";
import Card from './Card.js';

function Main({ isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, onCardClick }) {

  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription ] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getDataToLoadPage()
    .then(data => {
      const [ userData, initialCardsData ] = data;
      setUserName(userData.name);
      setUserAvatar(userData.avatar);
      setUserDescription(data.about);
      setCards(initialCardsData);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__image" onClick={isEditAvatarPopupOpen}>
          <img className="profile__avatar" alt="Аватар пользователя" src={userAvatar}/>
        </div>
        <div className="profile__container">
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__job">{userDescription}</p>
          </div>
          <button type="button" className="profile__edit-button" onClick={isEditProfilePopupOpen}></button>
        </div>
        <button type="button" className="profile__add-button" onClick={isAddPlacePopupOpen}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card card={card} onCardClick={onCardClick} key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
