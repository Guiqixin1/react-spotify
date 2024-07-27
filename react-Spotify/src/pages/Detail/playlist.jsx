import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { useApiClient } from '@/utils/api';
import {
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  PauseOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAudio } from '@/store/modules/audioList.js';
import MusicList from '@/components/MusicList';
import './playlist.scss';
// 引入loading组件
import Loading from '@/components/Loading';
// 使用MusicPlayerContext获取音乐播放器的实例
import { MusicPlayerContext } from '@/components/context/MusicPlayerContext.jsx';
const Playlist = () => {
  const { getRecommendationPlaylists } = useApiClient();
  // 获取实例
  const musicPlayerRef = useContext(MusicPlayerContext);
  const dispatch = useDispatch();
  // 从地址栏获取id
  const { id } = useParams();
  // 音乐列表的数据
  const [DataList, setDataList] = useState([]);
  // 音乐头部的数据
  const [DataHeader, setDataHeader] = useState({});
  // store里面的音乐列表数据
  const { audioLists } = useSelector(state => state.audioLists);
  // 播放信息
  const { audioInfo } = useSelector(state => state.audioLists);
  // 毫秒转为分钟的函数
  function millisToMinutes(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  // 进入playlist页面获取数据
  async function getPlaylist() {
    const playlist = await getRecommendationPlaylists(id);
    setDataHeader({
      image: playlist?.data?.images?.[0]?.url || '',
      name: playlist?.data?.name || '',
      description: playlist?.data?.description || '',
      tracksNum: playlist?.data?.tracks?.total || '',
      id: playlist?.data?.id
    });
    setDataList(
      playlist?.data?.tracks?.items?.map(item => ({
        image: item?.track?.album?.images?.[0]?.url || '',
        AlbumName: item?.track?.album?.name || '',
        ArtistName: item?.track?.artists?.[0]?.name || '',
        time: millisToMinutes(item?.track?.duration_ms) || 0,
        id: item?.track?.id || '',
        AlbumId: item?.track?.album?.id || '',
        ArtistId: item?.track?.artists?.[0]?.id || ''
      })) || []
    );
    setLoaing(false);
  }
  async function handelDispatch(id) {
    const res = await getRecommendationPlaylists(id);
    console.log(res);
    const audioListObj = res.data.tracks.items.map(item => ({
      name: item.track.album.name,
      singer: item.track.artists[0].name,
      cover: item.track.album.images[0].url,
      musicSrc: item.track.preview_url,
      id: item.track.id
    }));
    // 如果两个数组不相等，则需要提交新的音乐列表
    if (!compareMusciArray(audioListObj, audioLists)) {
      dispatch(setCurrentAudio(audioListObj));
    }
    musicPlayerRef.current.onTogglePlay();
    setIfPaused(audioInfo.paused);
  }

  // 暂停音乐的函数
  function handlePauseMusic() {
    musicPlayerRef.current.onTogglePlay();
    setIfPaused(audioInfo.paused);
  }
  // 判断提交的音乐数组是否相等的函数
  function compareMusciArray(arr1, arr2) {
    // 如果两个数组都不存在(undefined),则返回true
    if (arr1 === undefined && arr2 === undefined) {
      return false;
    }

    // 如果只有一个数组不存在(undefined),则返回false
    if (arr1 === undefined || arr2 === undefined) {
      return false;
    }

    // 如果两个数组长度不同,则返回false
    if (arr1.length !== arr2.length) {
      return false;
    }

    // 只需要判断第一项是否相等就行
    if (arr1[0].id !== arr2[0].id) {
      return false;
    }

    // 两数组相等
    return true;
  }

  // 根据索引进行切歌
  function handlePlayMusicByIndex(index) {
    musicPlayerRef.current.playByIndex(index);
  }

  useEffect(() => {
    getPlaylist();
    setIfPaused(audioInfo.paused);
  }, [id, audioInfo.paused]);

  // 加载标识
  const [loading, setLoaing] = useState(true);
  // 是否播放的标识
  const [ifPaused, setIfPaused] = useState(true);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="Playlist">
          <div className="head">
            <div className="arrow">
              <Button type="text" shape="circle" icon={<LeftOutlined />} />
              <Button type="text" shape="circle" icon={<RightOutlined />} />
            </div>
            <div className="btn">
              {ifPaused ? (
                <Button
                  shape="circle"
                  type="primary"
                  icon={<RightOutlined />}
                  className="paused"
                  onClick={() => handelDispatch(id)}
                ></Button>
              ) : (
                <Button
                  shape="circle"
                  type="primary"
                  icon={<PauseOutlined />}
                  className="paused"
                  onClick={() => handlePauseMusic()}
                ></Button>
              )}
            </div>

            <div className="title">
              <h1>{DataHeader.name}</h1>
            </div>
          </div>
          <div className="main">
            <div className="content">
              <div className="img">
                <img src={DataHeader.image} alt="" />
              </div>
              <div className="text">
                <h5>歌单</h5>
                <h1>{DataHeader.name}</h1>
                <h2>{DataHeader.description}</h2>
                <h4>{`为你打造- ${DataHeader.tracksNum}首歌曲，大约1小时30分钟`}</h4>
              </div>
            </div>
            <div className="middle">
              <div className="btn">
                {ifPaused ? (
                  <Button
                    shape="circle"
                    type="primary"
                    icon={<RightOutlined />}
                    className="paused"
                    onClick={() => handelDispatch(id)}
                  ></Button>
                ) : (
                  <Button
                    shape="circle"
                    type="primary"
                    icon={<PauseOutlined />}
                    className="paused"
                    onClick={() => handelDispatch(id)}
                  ></Button>
                )}
                <div className="plus">
                  <Button
                    type="default"
                    shape="circle"
                    icon={<PlusOutlined />}
                  ></Button>
                </div>
              </div>
            </div>
            <div className="list">
              <MusicList DataList={DataList} onClick={handlePlayMusicByIndex} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Playlist;
