import React from 'react';
import LazyLoad from 'react-lazyload';
const MusicCard = ({ url, title, description, onClick }) => {
  return (
    <div className="box" onClick={onClick}>
      <div className="music-card">
        <LazyLoad once>
          <img className="music-card__image" src={url} />
        </LazyLoad>
        <div className="music-card__info">
          <h2 className="music-card__title">{title}</h2>
          <p className="music-card__description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
