import React, { useRef, useState, useEffect, useContext } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import { useSelector, useDispatch } from 'react-redux';
import { setAudioInfo, setTrackInfo } from '../store/modules/audioList';
// 导入MusicPlayerContext
import { MusicPlayerContext } from '@/components/context/MusicPlayerContext.jsx';
// 获取api
import { useApiClient } from '@/utils/api.jsx';
const MusicPlayer = () => {
  // 获取歌曲和艺人的api
  const { getTrack, getArtist } = useApiClient();
  const playerRef = useRef(null);
  const musciPlayerRef = useContext(MusicPlayerContext);
  const { audioLists, trackInfo } = useSelector(state => state.audioLists);
  const [MusicPlayerList, setMusicPlayerList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setMusicPlayerList(audioLists);
    musciPlayerRef.current = playerRef.current;
    console.log(musciPlayerRef.current);
  }, [audioLists]);
  const options = {
    // Configure player options
    theme: 'dark',
    mode: 'full',
    showDownload: false,
    remember: true,
    remover: true,
    seeked: true,
    showProgressLoadBar: true,
    loadAudioErrorPlayNext: true,
    showPlay: true,
    autoPlayInitLoadPlayList: true,
    clearPriorAudioLists: true,
    preload: true
  };
  async function onAudioPlay(audioInfo) {
    // console.log('开始播放', audioInfo);
    const filterAudioInfo = { ...audioInfo, played: {} };
    dispatch(setAudioInfo(filterAudioInfo));
    if (!trackInfo || trackInfo.id !== audioInfo.id) {
      // 根据曲目的id获取相关信息
      const res = await getTrack(audioInfo.id);
      const artistRes = await getArtist(res.data.artists[0].id);

      const AsideData = {
        TrackId: res.data.id,
        AlbumId: res.data.album.id,
        ArtistId: res.data.artists[0].id,
        AlbumName: res.data.album.name,
        ArtistName: res.data.artists[0].name,
        AlbumImage: res.data.album.images[0].url,
        ArtistImage: artistRes.data.images[0].url,
        followers: artistRes.data.followers.total
      };

      dispatch(setTrackInfo(AsideData));
    }
  }
  function onAudioPause(audioInfo) {
    // console.log('暂停播放', audioInfo);
    const filterAudioInfo = { ...audioInfo, played: {} };
    dispatch(setAudioInfo(filterAudioInfo));
  }
  // 播放列表变化
  function onAudioListsChange() {
    playerRef.current.playByIndex(0);
  }

  return (
    <ReactJkMusicPlayer
      ref={playerRef}
      audioLists={MusicPlayerList}
      {...options}
      onAudioPlay={onAudioPlay}
      onAudioPause={onAudioPause}
      onAudioListsChange={onAudioListsChange}
    />
  );
};

export default MusicPlayer;
