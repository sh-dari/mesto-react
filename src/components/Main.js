import React, { useState, useEffect } from 'react';
import api from "../utils/Api.js";
import Card from './Card.js';

function Main(props) {

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
        <div className="profile__image" onClick={props.isEditAvatarPopupOpen}>
          <img className="profile__avatar" alt="Аватар пользователя" src={userAvatar}/>
        </div>
        <div className="profile__container">
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__job">{userDescription}</p>
          </div>
          <button type="button" className="profile__edit-button" onClick={props.isEditProfilePopupOpen}></button>
        </div>
        <button type="button" className="profile__add-button" onClick={props.isAddPlacePopupOpen}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card card={card} onCardClick={props.onCardClick} key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
