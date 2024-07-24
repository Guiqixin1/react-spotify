import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApiClient } from '@/utils/api';
import { LeftOutlined, RightOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { setCurrentAudio } from '@/store/modules/audioList.js';
import img from '@/assets/img2.jpg';

import MusicList from '@/components/MusicList';
import './playlist.scss';
const Playlist = () => {
  const { getRecommendationPlaylists } = useApiClient();
  const dispatch = useDispatch();
  // 从地址栏获取id
  const { id } = useParams();
  // 音乐列表的数据

  const [DataList, setDataList] = useState([]);

  // 毫秒转为分钟的函数
  function millisToMinutes(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  // 进入playlist页面获取数据
  async function getPlaylist() {
    const playlist = await getRecommendationPlaylists(id);
    console.log(playlist);
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
    dispatch(setCurrentAudio(audioListObj));
  }
  useEffect(() => {
    getPlaylist();
    console.log(DataList);
  }, []);
  console.log(DataList);
  return (
    <div className="Playlist">
      <div className="head">
        <div className="arrow">
          <Button type="text" shape="circle" icon={<LeftOutlined />} />
          <Button type="text" shape="circle" icon={<RightOutlined />} />
        </div>
        <div className="btn">
          <div className="broadcast" onClick={() => handelDispatch(id)}></div>
        </div>
        <div className="title">
          <h1>每周新发现</h1>
        </div>
      </div>
      <div className="main">
        <div className="content">
          <div className="img">
            <img src={img} alt="" />
          </div>
          <div className="text">
            <h5>歌单</h5>
            <h1>每周新发现</h1>
            <h2>编辑推荐：本周推荐歌曲，每周一更新</h2>
            <h4>为你打造- 30首歌曲，大约1小时30分钟</h4>
          </div>
        </div>
        <div className="middle">
          <div className="btn">
            <div className="broadcast" onClick={() => handelDispatch(id)}></div>
            <div className="plus">
              <Button
                type="default"
                shape="circle"
                icon={<PlusOutlined />}
              ></Button>
            </div>
          </div>
        </div>

        <MusicList DataList={DataList} />
      </div>
    </div>
  );
};

export default Playlist;
