import React from 'react';

const MusicCard = ({ url, title, description }) => {
  return (
    <div className="box">
      <div className="music-card">
        <img className="music-card__image" src={url} alt="Album cover" />
        <div className="music-card__info">
          <h2 className="music-card__title">{title}</h2>
          <p className="music-card__description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
