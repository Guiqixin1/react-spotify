import './track.scss';
// 引入loading组件
import Loading from '@/components/Loading';
import { Button } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  PauseOutlined
} from '@ant-design/icons';
import { useEffect, useState, useContext } from 'react';
import MusicList from '@/components/MusicList';
import { useApiClient } from '@/utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentAudio } from '@/store/modules/audioList';
// 使用MusicPlayerContext获取音乐播放器 的实例
import { MusicPlayerContext } from '@/components/context/MusicPlayerContext.jsx';
const Tracks = () => {
  const dispatch = useDispatch();
  const { getRecommendationsTrack, getTrack, getArtist } = useApiClient();
  const [ifPaused, setIfPaused] = useState(true);
  const { id } = useParams();
  // 音乐曲目完整的列表
  const [TrackList, setTrackList] = useState([]);
  // 这首歌曲的信息
  const [TrackData, setTrackData] = useState();
  const [RecommationTrack, setRecommationTrack] = useState([]);
  // loading
  const [loading, setLoaing] = useState(true);
  // 获取实例
  const musicPlayerRef = useContext(MusicPlayerContext);
  // 毫秒转为分钟的函数
  function millisToMinutes(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  async function getData() {
    const res = await getTrack(id);
    const artist = await getArtist(res.data.artists[0].id);
    const newTrackList = [
      {
        id: res?.data?.id || '',
        singer: res?.data?.artists[0].name || '',
        cover: res?.data?.album.images[0].url || '',
        musicSrc: res?.data?.preview_url || '',
        name: res?.data?.name || ''
      }
    ];
    setTrackData({
      trackId: res?.data?.id || '',
      albumId: res?.data?.album?.id || '',
      artistId: res?.data?.artists[0]?.id || '',
      trackName: res?.data?.name || '',
      trackTime: millisToMinutes(res?.data?.duration_ms || 0) || '',
      trackMusic: res?.data?.preview_url || '',
      albumName: res?.data?.album.name || '',
      albumDay: res?.data?.album.release_date || '',
      albumImage: res?.data?.album.images[0].url || '',
      artistName: res?.data?.artists[0].name || '',
      artistImgae: artist?.data?.images[0].url || '',
      followers: artist?.data?.followers?.total || ''
    });
    const recommationres = await getRecommendationsTrack(
      res.data.artists[0].id,
      id
    );
    const DataList =
      recommationres?.data?.tracks?.map(item => ({
        image: item?.album?.images?.[0]?.url || '',
        AlbumName: item?.album?.name || '',
        ArtistName: item?.artists?.[0]?.name || '',
        time: millisToMinutes(item?.duration_ms) || 0,
        id: item?.id || '',
        AlbumId: item?.album?.id || '',
        ArtistId: item?.artists?.[0]?.id || '',
        TrackName: item?.name || ''
      })) || [];
    DataList.unshift({
      image: res?.data?.album.images[0].url || '',
      AlbumName: res?.data?.album.name || '',
      ArtistName: res?.data?.artists[0].name || '',
      time: millisToMinutes(res?.data?.duration_ms || 0) || 0,
      id: res?.data?.id || '',
      AlbumId: res?.data?.album?.id || '',
      ArtistId: res?.data?.artists[0]?.id || '',
      TrackName: res?.data?.name || ''
    });
    setRecommationTrack(DataList);

    newTrackList.push(
      ...(recommationres?.data?.tracks?.map(item => ({
        image: item?.album?.images?.[0]?.url,
        name: item?.name,
        artist: item?.artists?.[0]?.name,
        duration: millisToMinutes(item?.duration_ms),
        id: item?.id
      })) || [])
    );

    setTrackList(newTrackList);
    setLoaing(false);
  }
  async function handelDispatch() {
    dispatch(setCurrentAudio(TrackList));
    musicPlayerRef.current.onTogglePlay();
  }

  // 暂停音乐的函数
  function handlePauseMusic() {
    musicPlayerRef.current.onTogglePlay();
  }

  // 根据索引进行切歌
  function handlePlayMusicByIndex(index) {
    musicPlayerRef.current.playByIndex(index);
  }

  useEffect(() => {
    getData();
  }, [id]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="Track">
          <div className="head">
            <div className="arrow">
              <Button
                type="text"
                shape="circle"
                icon={<LeftOutlined />}
                onClick={() => navigate(-1)}
              />
              <Button
                type="text"
                shape="circle"
                icon={<RightOutlined />}
                onClick={() => navigate(1)}
              />
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
              <h1>{TrackData.trackName}</h1>
            </div>
          </div>
          <div className="main">
            <div className="content">
              <div className="img">
                <img src={TrackData.albumImage} alt="" />
              </div>
              <div className="text">
                <h5>歌曲</h5>
                <h1>{TrackData.trackName}</h1>
                <div className="descript">
                  <img
                    className="artistImg"
                    src={TrackData.artistImgae}
                    alt=""
                  />
                  <div className="artistName">{TrackData.artistName}</div>
                  <div className="albumName">{TrackData.albumName}</div>
                  <div className="descript">
                    {TrackData.albumDay} * {TrackData.trackTime} *
                    {TrackData.followers}
                  </div>
                </div>
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
                    onClick={() => handlePauseMusic()}
                  ></Button>
                )}
                {/* <div className="plus">
                  <Button
                    type="default"
                    shape="circle"
                    icon={<PlusOutlined />}
                  ></Button>
                </div> */}
              </div>
            </div>
            <div className="artist">
              <img src={TrackData.artistImgae} alt="" />
              <div className="name">
                <h3>艺人</h3>
                <p>{TrackData.artistName}</p>
              </div>
              <div className="title">推荐 - 基于此歌</div>
            </div>
            <div className="list">
              <div className="recommation">
                <MusicList
                  DataList={RecommationTrack}
                  onClick={handlePlayMusicByIndex}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tracks;
