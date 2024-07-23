import React from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import { useSelector } from 'react-redux';
import { addAudioList } from '../store/modules/audioList';
const MusicPlayer = () => {
  const { audioLists } = useSelector(state => state.persistedAudioListReducer);
  console.log(audioLists);
  const options = {
    // Configure player options
    theme: 'dark', // Use 'dark' or 'light' theme
    mode: 'full',
    autoPlay: false,
    showDownload: false,
    remember: true,
    remover: true,
    seeked: true,
    showProgressLoadBar: true,
    loadAudioErrorPlayNext: true,
    autoPlayInitLoadPlayList: true
  };
  // // 当前播放音乐发生改变
  // function onAudioPlayTrackChange(currentPlayId, audioLists, audioInfo) {
  //   console.log(currentPlayId, audioLists, audioInfo);
  // }
  // // 播放列表发生变化
  // function onAudioListsChange(currentPlayId, audioLists, audioInfo) {
  //   logic(111);
  //   console.log(currentPlayId, audioLists, audioInfo);
  //   audioLists = audioLists.push({
  //     cover: 'https://i.scdn.co/image/ab67616d0000b273ed71b8008aaa879622f8c3b5',
  //     currentLyric: undefined,
  //     currentTime: 0
  //   });
  // }
  // // 当前音乐播放的函数
  // function onAudioPlay(audioInfo) {
  //   console.log(audioInfo);
  // }

  return <ReactJkMusicPlayer audioLists={audioLists} {...options} />;
};

export default MusicPlayer;
