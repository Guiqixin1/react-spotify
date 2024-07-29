const contentStyle = {
  textAlign: 'center',
  minHeight: '75vh',
  lineHeight: '120px',
  color: '#fff',
  overflowY: 'scroll',
  backgroundColor: '#1C1C1C',
  dispalay: 'flex',
  // Width: '79vw',
  // 不换行
  flexWrap: 'nowrap',
  marginRight: '5px',
  boxSizing: 'border-box'
};

const siderStyle_left = {
  color: '#E1E1E1',
  backgroundColor: '#000000',
  overflow: 'hidden',
  height: '90vh',
  boxSizing: 'border-box',
  flexWrap: 'nowrap'
};
const siderStyle_right = {
  color: '#E1E1E1',
  backgroundColor: '#000000',
  overflow: 'hidden',
  height: '90vh',
  boxSizing: 'border-box',
  flexWrap: 'nowrap',
  display: 'block'
};

const layoutStyle = {
  borderRadius: 8,
  width: '100vw',
  height: '90vh',
  backgroundColor: '#000000',
  display: 'flex'
};
import './index.scss';
import { Flex, Layout, Col, Row, Card, Button, Radio, message } from 'antd';
// 按需引入antd图标
import {
  SpotifyFilled,
  BankFilled,
  SearchOutlined,
  CloseCircleFilled,
  PlusCircleOutlined,
  CheckOutlined
} from '@ant-design/icons';
import arrow from '@/assets/arrow.png';
import stack from '@/assets/stack.png';
import plus from '@/assets/plus.png';
import Search from '@/assets/search.png';
import queue from '@/assets/queue.png';
import React from 'react';

// 引入Effect在页面挂载后执行
import { useEffect, useState, useRef } from 'react';

const { Sider, Content } = Layout;
// 引入api接口
import { useApiClient } from '../../utils/api.jsx';
import MusicCard from '../../components/MusicCard';
// 引入音乐播放器
import MusicPlayer from '../../components/MusicPlayer';
import { MusicPlayerProvider } from '@/components/context/MusicPlayerContext';

import { Outlet, Link, useNavigate } from 'react-router-dom';
// 处理右侧side
import { useSelector, useDispatch } from 'react-redux';
// 引入trackInfo action
import { setTrackInfo } from '@/store/modules/audioList';

// 组件
const Home = () => {
  // 引入api
  const {
    CheckTrack,
    RemoveTrack,
    SaveTrack,
    CheckFollowArtist,
    UnFollowArtist,
    FollowArtist
  } = useApiClient();
  // 判断是否加入歌单
  const [checkedTrack, setCheckedTrack] = useState(false);
  // 判断是否关注
  const [checkedArtist, setCheckedArtist] = useState(false);
  // playlists标识符;
  const [ifPlayList, setIfPlayLists] = useState(false);

  // 点击搜索图片出现输入款，进行在表单内的搜搜
  const inputRef = useRef(null);
  function handleInput() {
    inputRef.current.focus();
    console.log(inputRef.current);
    inputRef.current.classList.add('opacity');
  }

  // 默认获取首页的内容 标识
  const [show, setShow] = useState('all');
  // 点击顶部导航显示相应页面
  function handleData(value) {
    if (value !== show) {
      setShow(value);
    }
  }

  // 引入右侧音乐信息
  const { trackInfo } = useSelector(state => state.audioLists);
  const dispatch = useDispatch();

  // // 判断右侧导航是否出现的标识
  const [showRightNav, setShowRightNav] = useState(trackInfo?.display);
  function handleCloseRightNav() {
    setShowRightNav(false);
    dispatch(setTrackInfo({ ...trackInfo, display: false }));
  }
  useEffect(() => {
    if (trackInfo?.display) {
      setShowRightNav(true);
    }
    checkSavedTrack(trackInfo?.TrackId);
    checkSavedArtist(trackInfo?.ArtistId);
  }, [trackInfo?.display, trackInfo?.TrackId]);
  const navigate = useNavigate();
  function handleArtist(id) {
    navigate(`/artist/${id}`);
  }
  function handleAlbum(id) {
    navigate(`/album/${id}`);
  }
  // 点击喜欢/取消喜欢按钮
  async function handleSavedTrack(id) {
    // 如果该曲目已经被点赞
    if (checkedTrack) {
      await RemoveTrack(id);
      setCheckedTrack(false);
      message.info('已从已点赞的歌曲中删除');
    }
    // 如果该曲目未被点赞
    else {
      await SaveTrack(id);
      setCheckedTrack(true);
      message.info('已添加到已点赞的歌曲');
    }
  }
  // 点击关注/取消关注按钮
  async function handleSavedArtist(id) {
    if (checkedArtist) {
      await UnFollowArtist(id);
      setCheckedArtist(false);
      message.info('已从音乐库中删除');
    } else {
      await FollowArtist(id);
      setCheckedArtist(true);
      message.info('已添加到音乐库');
    }
  }
  // 检查单曲是否被收录
  async function checkSavedTrack(id) {
    const res = await CheckTrack(id);
    setCheckedTrack(res.data[0]);
  }
  // 检查艺人是否被关注
  async function checkSavedArtist(id) {
    const res = await CheckFollowArtist(id);
    setCheckedArtist(res.data[0]);
  }

  return (
    <Flex gap="middle">
      <MusicPlayerProvider>
        <Layout className="layoutStyle" style={layoutStyle}>
          <Sider width="21%" style={siderStyle_left}>
            <div className="top">
              <Row>
                <Col className="TopCol" span={24}>
                  <SpotifyFilled />
                  <span>Spority</span>
                </Col>
                <Col className="TopCol" span={24}>
                  <BankFilled />
                  <Link to={'/'}>
                    <span>Home</span>
                  </Link>
                </Col>
                <Col className="TopCol" span={24}>
                  <SearchOutlined />
                  {/* <span>Search</span> */}
                  <Link to={'/search'}>
                    <span>Search</span>
                  </Link>
                </Col>
              </Row>
            </div>
            <div className="bottom">
              <div className="card">
                <Row gutter={[32, 24]}>
                  <Col className="bottomCol" span={2}>
                    <img src={stack} alt="" />
                  </Col>
                  <Col className="bottomCol" span={12}>
                    <span>Your Libary</span>
                  </Col>
                  <Col className="bottomCol" span={8}>
                    <img className="plus" src={plus} alt="" />
                    <img src={arrow} alt="" />
                  </Col>
                </Row>
                <Row>
                  <div className="Playlists">
                    {!ifPlayList && (
                      <button
                        className="PlaylistsBtn"
                        onClick={() => setIfPlayLists(true)}
                      >
                        Playlists
                      </button>
                    )}
                    {ifPlayList && (
                      <div className="fullPlayList">
                        <button
                          className="close"
                          onClick={() => setIfPlayLists(false)}
                        >
                          X
                        </button>
                        <button className="PlaylistsBtn">Playlists</button>
                        <button className="PlaylistsBtn">By you</button>
                      </div>
                    )}
                  </div>
                </Row>
                <Row>
                  <div className="Recents">
                    <Col>
                      <div className="search">
                        <input
                          type="text"
                          placeholder="Search in Your Library"
                          ref={inputRef}
                        />
                        <img
                          src={Search}
                          onClick={handleInput}
                          alt=""
                          title="Search in Your Library"
                        />
                        <button className="searchBtn">
                          <span>Recents</span>
                          <img className="queue" src={queue} alt="" />
                        </button>
                      </div>
                    </Col>
                  </div>
                </Row>
                <Row>
                  <Card
                    bordered={false}
                    style={{
                      width: '100%',
                      marginTop: 24,
                      backgroundColor: '#242424',
                      color: '#FFF',
                      borderRadius: 8
                    }}
                  >
                    <p className="title">建立你的第一个播放清单</p>
                    <p style={{ fontSize: 18 }}>这很简单，我们会帮你</p>
                    <button className="btn">建立播放清单</button>
                  </Card>
                </Row>
              </div>
            </div>
          </Sider>

          <Content style={contentStyle}>
            <Outlet />
          </Content>
          {/* 侧边栏 */}
          {showRightNav && (
            <Sider width="21%" style={siderStyle_right}>
              <div className="rightNav">
                <div className="header">
                  <div className="title">
                    <Link to={`/album/${trackInfo.AlbumId}`}>
                      {trackInfo.AlbumName}
                    </Link>
                    <div className="close" onClick={handleCloseRightNav}>
                      <CloseCircleFilled />
                    </div>
                  </div>
                </div>
                <div className="main">
                  <div className="ablum">
                    <MusicCard
                      url={trackInfo.AlbumImage}
                      title={trackInfo.TrackName}
                      description={'关于艺人'}
                      onClick={() => handleAlbum(trackInfo.AlbumId)}
                    ></MusicCard>
                    <div className="plus">
                      <Button
                        type="dashed"
                        shape="circle"
                        icon={
                          checkedTrack ? (
                            <CheckOutlined />
                          ) : (
                            <PlusCircleOutlined />
                          )
                        }
                        onClick={() => handleSavedTrack(trackInfo.TrackId)}
                      />
                    </div>
                  </div>
                  <div className="artist">
                    <MusicCard
                      url={trackInfo.ArtistImage}
                      title={trackInfo.ArtistName}
                      description={`每月有${trackInfo.followers}名听众`}
                      onClick={() => handleArtist(trackInfo.ArtistId)}
                    ></MusicCard>
                    <div className="plus">
                      <Radio.Button
                        value="default"
                        onClick={() => handleSavedArtist(trackInfo.ArtistId)}
                      >
                        {checkedArtist ? '取消关注' : '关注'}
                      </Radio.Button>
                    </div>
                  </div>
                  {/* <div className="playlist">
                  <Card
                    style={{
                      width: '21vw',
                      height: '150px',
                      marginTop: '10px',
                      backgroundColor: '#5d5d5d',
                      boxSizing: 'border-box',
                      border: 'none'
                    }}
                  >
                    <div className="title">
                      <h1>队列中的下一首歌</h1>
                      <Button type="text" className="btn">
                        打开队列
                      </Button>
                    </div>
                    <div className="music">
                      <Button
                        type="text"
                        icon={<CaretRightFilled />}
                        shape="circle"
                        className="btn"
                      ></Button>
                      <img src={img} className="music_img" alt="" />
                      <div className="info">
                        <h1 className="music_name">歌曲名称</h1>
                        <h1 className="music_singer">歌手名称</h1>
                      </div>
                    </div>
                  </Card>
                </div> */}
                </div>
              </div>
            </Sider>
          )}
        </Layout>
        <div>
          <MusicPlayer />
        </div>
      </MusicPlayerProvider>
    </Flex>
  );
};

export default Home;
