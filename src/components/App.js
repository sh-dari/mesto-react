import { useState, useEffect } from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setСurrentUser] = useState({});

  useEffect(() => {
    api.getDataToLoadPage()
    .then(data => {
      const [userData, initialCardsData] = data;
      setСurrentUser(userData);
      setCards(initialCardsData);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({})
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then(newCard => {
      setCards(state => state.map(current => current._id === card._id ? newCard : current));
    })
    .catch((err) => {
      console.log(err);
    });
  };
  const handleCardDelete = (card) => {
    api.deleteCard(card._id).then(() => {
      setCards(state => state.filter(item => item !== card));
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const handleUpdateUser = (profile) => {
    api.updateUserInfo(profile).then(() => {
      setСurrentUser({avatar: currentUser.avatar, ...profile});
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  };
  const handleUpdateAvatar = ({avatar}) => {
    api.changeAvatar(avatar).then(() => {
      setСurrentUser({...currentUser, avatar});
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main isEditAvatarPopupOpen={handleEditAvatarClick} isEditProfilePopupOpen={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick}
        onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <PopupWithForm name="card" title="Новое место" button="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} >
          <fieldset className="popup__input-container">
            <input className="popup__item popup__item_el_place" type="text" id="place-input" name="name" placeholder="Название" required minLength="2" maxLength="30"/>
            <span className="popup__item-error place-input-error"></span>
            <input className="popup__item popup__item_el_link" type="url" id="link-input" name="link" placeholder="Ссылка на картинку" required/>
            <span className="popup__item-error link-input-error"></span>
          </fieldset>
        </PopupWithForm>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <PopupWithForm name="delete" title="Вы уверены?" button="Да" onClose={closeAllPopups} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
