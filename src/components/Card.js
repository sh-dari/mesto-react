function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return(
    <li className="elements__item" onClick={handleClick}>
      <img className="elements__img" alt="Карточка профиля" src={props.card.link}/>
      <div className="elements__description">
        <h2 className="elements__place">{props.card.name}</h2>
        <div className="elements__like">
          <button type="button" className="elements__heart"></button>
          <p className="elements__like-count">{props.card.likes.length}</p>
        </div>
      </div>
      <button type="button" className="elements__trash"></button>
    </li>
  );
}

export default Card;
