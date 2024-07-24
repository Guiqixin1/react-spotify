import React from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import { useSelector } from 'react-redux';
// import { addAudioList } from '../store/modules/audioList';
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
    autoPlayInitLoadPlayList: true,
    showPlay: true
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
  function onAudioPlay(audioInfo) {
    console.log(audioInfo);
  }
  function updatePlayIndex(index) {
    console.log(index);
  }
  function onPlayIndexChange(index) {
    onPlayIndexChange;
  }
  function togglePlay(audioInfo) {
    console.log(audioInfo);
  }
  return (
    <ReactJkMusicPlayer
      updatePlayIndex={() => {
        updatePlayIndex(1);
      }}
      onPlayIndexChange={onPlayIndexChange}
      // onAudioPlay={onAudioPlay}
      audioLists={audioLists}
      togglePlay={togglePlay}
      {...options}
    />
  );
};

export default MusicPlayer;

// import React from 'react';
// import ReactJkMusicPlayer from 'react-jinke-music-player';
// import 'react-jinke-music-player/assets/index.css';
// class MusicPlayer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.audioInstance = null;
//   }
//   render() {
//     return (
//       <>
//         <ReactJkMusicPlayer
//           getAudioInstance={instance => {
//             this.audioInstance = instance;
//           }}
//         />
//         <button onClick={() => this.audioInstance.play()}>play</button>
//         <button onClick={() => this.audioInstance.pause()}>pause</button>
//         <button onClick={() => this.audioInstance.load()}>reload</button>
//         <button onClick={() => (this.audioInstance.currentTime = 40)}>
//           change current play time
//         </button>
//         <button onClick={() => (this.audioInstance.playbackRate = 2)}>
//           change play back rate
//         </button>
//         <button onClick={() => (this.audioInstance.volume = 0.2)}>
//           change volume
//         </button>
//         <button onClick={() => this.audioInstance.destroy()}>
//           destroy player
//         </button>
//         <button onClick={this.audio.togglePlay}>toggle play</button>
//         <button onClick={this.audio.clear}>clear audio lists</button>
//         <button onClick={this.audio.playNext}>play next</button>
//         <button onClick={this.audio.playPrev}>play prev</button>
//         <button onClick={() => this.audio.playByIndex(1)}>play by index</button>
//         <button onClick={() => this.audio.updatePlayIndex(1)}>
//           update play index
//         </button>
//       </>
//     );
//   }
// }

// export default MusicPlayer;
