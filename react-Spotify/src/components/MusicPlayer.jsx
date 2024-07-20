import React from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';

const MusicPlayer = () => {
  const audioList = [
    {
      name: 'Song 1',
      singer: 'Artist 1',
      cover: 'song1.jpg',
      musicSrc:
        'https://p.scdn.co/mp3-preview/6eafa4293d2b35b2e75ffab5ec1bba8ec00d5082?cid=cfe923b2d660439caf2b557b21f31221'
    }
    // {
    //   name: 'Song 2',
    //   singer: 'Artist 2',
    //   cover: 'song2.jpg',
    //   musicSrc: 'song2.mp3'
    // }
    // Add more songs as needed
  ];

  const options = {
    // Configure player options
    theme: 'dark', // Use 'dark' or 'light' theme
    mode: 'full',
    autoPlay: false,
    showDownload: false,
    remember: true,
    remover: true,
    seeked: true,
    showProgressLoadBar: true
  };

  return <ReactJkMusicPlayer audioLists={audioList} {...options} />;
};

export default MusicPlayer;
