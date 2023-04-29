import { useState, useEffect } from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [loading, setLoading] = useState(false);

  const [currentUser, setСurrentUser] = useState({});

  const [delitingCard, setDelitingCard] = useState({});

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
    setIsDeletePopupOpen(false);
    setSelectedCard({});
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
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards(state => state.map(current => current._id === card._id ? newCard : current));
    })
    .catch((err) => {
      console.log(err);
    });
  };
  const handleCardDelete = (card) => {
    setIsDeletePopupOpen(true);
    setDelitingCard(card);
  };
  const handlePopupDelete = (card) => {
    api.deleteCard(card._id).then(() => {
      setCards(state => state.filter(item => item !== card));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  };
  const handlePopupDeleteSubmit = (evt) => {
    evt.preventDefault();
    handlePopupDelete(delitingCard);
  };

  const handleUpdateUser = (profile) => {
    setLoading(true);
    api.updateUserInfo(profile).then((userData) => {
      setСurrentUser(userData);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
  };
  const handleUpdateAvatar = ({avatar}) => {
    setLoading(true);
    api.changeAvatar(avatar).then((userData) => {
      setСurrentUser(userData);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleCreateCard = (card) => {
    setLoading(true);
    api.addNewCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          isEditAvatarPopupOpen={handleEditAvatarClick}
          isEditProfilePopupOpen={handleEditProfileClick}
          isAddPlacePopupOpen={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={loading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCreateCard={handleCreateCard}
          isLoading={loading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={loading}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          button="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handlePopupDeleteSubmit}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
