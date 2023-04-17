export const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  popupSelector: '.popup',
  fieldsetSelector: '.popup__input-container',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
}

const profilePopupSelector = document.querySelector('.popup_for_profile');
export const profilePopupContainer = profilePopupSelector.querySelector('.popup__container');

const cardPopupSelector = document.querySelector('.popup_for_card');
export const cardPopupContainer = cardPopupSelector.querySelector('.popup__container');

const avatarPopupSelector = document.querySelector('.popup_for_avatar');
export const avatarPopupContainer = avatarPopupSelector.querySelector('.popup__container');

export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const buttonChangeAvatar = document.querySelector('.profile__image');

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
