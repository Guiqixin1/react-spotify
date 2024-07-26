// import React, { useRef, useState, useEffect } from 'react';
// import ReactJkMusicPlayer from 'react-jinke-music-player';
// import 'react-jinke-music-player/assets/index.css';
// import { useSelector } from 'react-redux';

// const MusicPlayer = () => {
//   const playerRef = useRef(null);
//   const { audioLists, CurrentPlayIndex } = useSelector(
//     state => state.persistedAudioListReducer
//   );
//   const options = {
//     // Configure player options
//     theme: 'dark', // Use 'dark' or 'light' theme
//     mode: 'full',
//     showDownload: false,
//     remember: true,
//     remover: true,
//     seeked: true,
//     showProgressLoadBar: true,
//     loadAudioErrorPlayNext: true,
//     autoPlayInitLoadPlayList: true,
//     showPlay: true,
//     autoPlay: true
//   };
//   const [audioListsData, setAudioListsData] = useState(audioLists);
//   const [playIndex, setPlayIndex] = useState(CurrentPlayIndex);
//   useEffect(() => {
//     setPlayIndex(CurrentPlayIndex);
//     console.log(playIndex);
//   });
//   return (
//     <ReactJkMusicPlayer
//       ref={playerRef}
//       audioLists={audioListsData}
//       {...options}
//       playIndex={playIndex}
//     />
//   );
// };

// export default MusicPlayer;

import React, { useRef, useState, useEffect, useContext } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import { useSelector, useDispatch } from 'react-redux';
import { setAudioInfo } from '../store/modules/audioList';
// 导入MusicPlayerContext
import { MusicPlayerContext } from '@/components/context/MusicPlayerContext.jsx';
const MusicPlayer = () => {
  const playerRef = useRef(null);
  const musciPlayerRef = useContext(MusicPlayerContext);
  const { audioLists, playIndex } = useSelector(
    state => state.persistedAudioListReducer
  );
  const [MusicPlayerList, setMusicPlayerList] = useState([]);
  const [MusicPlayerIndex, setMusicPlayerIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setMusicPlayerList(audioLists);
    setMusicPlayerIndex(playIndex);
    musciPlayerRef.current = playerRef.current;
    console.log(playerRef.current);
    console.log(playIndex);
  }, [audioLists, playIndex]);
  const options = {
    // Configure player options
    theme: 'dark',
    mode: 'full',
    showDownload: false,
    // remember: true,
    remover: true,
    seeked: true,
    showProgressLoadBar: true,
    loadAudioErrorPlayNext: true,
    showPlay: true,
    autoPlayInitLoadPlayList: false,
    clearPriorAudioLists: true,
    preload: true
  };
  function onAudioPlay(audioInfo) {
    console.log('开始播放', audioInfo);
    const filterAudioInfo = { ...audioInfo, played: {} };
    dispatch(setAudioInfo(filterAudioInfo));
  }
  function onAudioPause(audioInfo) {
    console.log('暂停播放', audioInfo);
    const filterAudioInfo = { ...audioInfo, played: {} };
    dispatch(setAudioInfo(filterAudioInfo));
  }
  return (
    <ReactJkMusicPlayer
      ref={playerRef}
      audioLists={MusicPlayerList}
      {...options}
      // playIndex={MusicPlayerIndex}
      onAudioPlay={onAudioPlay}
      onAudioPause={onAudioPause}
    />
  );
};

export default MusicPlayer;
