import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApiClient } from '@/utils/api';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import img2 from '@/assets/img2.jpg';

import './playlist.scss';
const Playlist = () => {
  const { getRecommendationPlaylists } = useApiClient();
  const { id } = useParams();
  async function getPlaylist() {
    const playlist = await getRecommendationPlaylists(id);
    console.log(playlist);
  }
  useEffect(() => {
    getPlaylist();
  });

  return (
    <div className="Playlist">
      <div className="head">
        <div className="arrow">
          <Button type="text" shape="circle" icon={<LeftOutlined />} />
          <Button type="text" shape="circle" icon={<RightOutlined />} />
        </div>
        <div className="btn">
          <div className="broadcast"></div>
        </div>
        <div className="title">
          <h1>每周新发现</h1>
        </div>
      </div>
      <div className="main">
        <div className="content">
          <div className="img">
            <img src={img2} alt="" />
          </div>
          <div className="text">
            <h5>歌单</h5>
            <h1>每周新发现</h1>
            <h2>编辑推荐：本周推荐歌曲，每周一更新</h2>
            <h4>为你打造- 30首歌曲，大约1小时30分钟</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
