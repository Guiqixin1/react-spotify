import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApiClient } from '@/utils/api';
import { LeftOutlined, RightOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, List, Avatar } from 'antd';
import { useDispatch } from 'react-redux';
import { setCurrentAudio } from '@/store/modules/audioList.js';
import img from '@/assets/img2.jpg';

import ListHead from '@/components/ListHeade';
// import InfiniteScroll from 'react-infinite-scroll-component';
import './playlist.scss';
const Playlist = () => {
  const { getRecommendationPlaylists } = useApiClient();
  const dispatch = useDispatch();
  // 从地址栏获取id
  const { id } = useParams();
  // 音乐列表的数据
  let DataList = [];
  const [Data, setData] = useState([]);
  async function getPlaylist() {
    const playlist = await getRecommendationPlaylists(id);
    console.log(playlist);
    DataList = playlist.data.tracks.items.map(item => ({
      image: item.track.album.images[0].url,
      AlbumName: item.track.album.name,
      ArtistName: item.track.artists[0].name,
      date: item.track.album.release_date,
      id: item.track.id
    }));
    console.log(DataList);
    setData(DataList);
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
  }, []);

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
        <div className="list">
          {/* <InfiniteScroll> */}
          {/* <List
            header={<ListHead />}
            dataSource={Data}
            gutter={11}
            column={3}
            renderItem={(item, index) => (
              <List.Item className='ListItem'>
                <List.Item.Meta
                  avatar={<Avatar src={item.image} />}
                  title={item.AlbumName}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          /> */}
          {/* </InfiniteScroll> */}
          <ul>
            <li className="head">
              <ListHead />
            </li>
            <li>111</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
