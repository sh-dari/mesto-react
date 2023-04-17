function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }
  return(
    <li className="elements__item" onClick={handleClick}>
      <img className="elements__img" alt={card.name} src={card.link}/>
      <div className="elements__description">
        <h2 className="elements__place">{card.name}</h2>
        <div className="elements__like">
          <button type="button" className="elements__heart"></button>
          <p className="elements__like-count">{card.likes.length}</p>
        </div>
      </div>
      <button type="button" className="elements__trash"></button>
    </li>
  );
}

export default Card;
