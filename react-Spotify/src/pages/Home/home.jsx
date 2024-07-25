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

const siderStyle = {
  color: '#E1E1E1',
  backgroundColor: '#000000',
  overflow: 'hidden',
  height: '90vh',
  boxSizing: 'border-box',
  flexWrap: 'nowrap'
};

const layoutStyle = {
  borderRadius: 8,
  width: '100vw',
  height: '90vh',
  backgroundColor: '#000000',
  display: 'flex'
};

import './index.scss';
import HeaderNav from '@/components/HeaderNav.jsx';
import { Flex, Layout, Col, Row, Card, Button } from 'antd';
// 按需引入antd图标
import {
  SpotifyFilled,
  BankFilled,
  SearchOutlined,
  CloseCircleFilled,
  PlusCircleOutlined,
  CheckOutlined,
  CaretRightFilled
} from '@ant-design/icons';
import arrow from '@/assets/arrow.png';
import stack from '@/assets/stack.png';
import plus from '@/assets/plus.png';
import Search from '@/assets/search.png';
import queue from '@/assets/queue.png';
import React from 'react';

// 引入Effect在页面挂载后执行
import { useEffect, useState, useRef } from 'react';
// 引入useLocation
import { useLocation } from 'react-router-dom';
const { Sider, Content, Header } = Layout;
// 引入api接口
import { useApiClient } from '../../utils/api.jsx';
import MusicCard from '../../components/MusicCard';
// 引入音乐播放器
import MusicPlayer from '../../components/MusicPlayer';
import { MusicPlayerProvider } from '@/components/context/MusicPlayerContext';

import { Route, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// 右侧样式照片
import img from '@/assets/img5.jpg';

// 组件
const Home = () => {
  // 判断是否加入歌单
  const [checked, setChecked] = useState(false);
  let accessToken = '';
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

  // 判断右侧导航是否出现的标识
  const [showRightNav, setShowRightNav] = useState(false);

  return (
    <Flex gap="middle">
      <MusicPlayerProvider>
        <Layout className="layoutStyle" style={layoutStyle}>
          <Sider width="21%" style={siderStyle}>
            <div className="top">
              <Row>
                <Col className="TopCol" span={24}>
                  <SpotifyFilled />
                  <span>Spority</span>
                </Col>
                <Col className="TopCol" span={24}>
                  <BankFilled />
                  <span>Home</span>
                </Col>
                <Col className="TopCol" span={24}>
                  <SearchOutlined />
                  <span>Search</span>
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
          <Sider width="21%" style={siderStyle}>
            <div className="rightNav">
              <div className="header">
                <div className="title">
                  <h1>spotifssssssssssssssssssssssssssssssy</h1>
                  <div className="close">
                    <CloseCircleFilled />
                  </div>
                </div>
              </div>
              <div className="main">
                <div className="ablum">
                  <MusicCard
                    url={img}
                    title={'每日推荐'}
                    description={'sdashjdiosahdioashdiohasidhssas'}
                  ></MusicCard>
                  <div className="plus">
                    <Button
                      type="dashed"
                      shape="circle"
                      icon={
                        checked ? <CheckOutlined /> : <PlusCircleOutlined />
                      }
                    />
                  </div>
                </div>
                <div className="artist">
                  <MusicCard
                    url={img}
                    title={'每日推荐'}
                    description={'sdashjdiosahdioashdiohasidhssas'}
                  ></MusicCard>
                  <div className="plus">
                    <Button
                      type="dashed"
                      shape="circle"
                      icon={
                        checked ? <CheckOutlined /> : <PlusCircleOutlined />
                      }
                    />
                  </div>
                </div>
                <div className="playlist">
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
                </div>
              </div>
            </div>
          </Sider>
        </Layout>
        <div>
          <MusicPlayer />
        </div>
      </MusicPlayerProvider>
    </Flex>
  );
};

export default Home;

{
  /* <Layout>
          <Content style={contentStyle}>
            <div className="header">
              <HeaderNav
                handleData={handleData}
                show={show}
                flag={showRightNav}
              ></HeaderNav>
            </div>

            {show === 'all' && (
              <div className="container">
                <div className="audiobook flexItem">
                  <div className="title">
                    <a className="h1">根据用户喜好推荐的曲目</a>
                    <a className="showAll">展示全部</a>
                  </div>
                  {userTopTracks?.slice(0, 4).map(item => {
                    return (
                      <div className="item" key={item.id}>
                        <MusicCard
                          url={item.album.images[0].url}
                          title={item.album.name}
                          description={item.album.release_date}
                          type={item.type}
                        ></MusicCard>
                        <div className="broadcast"></div>
                      </div>
                    );
                  })}
                </div>
                <div className="artists flexItem">
                  <div className="title">
                    <a className="h1">著名艺人</a>
                    <a className="showAll">展示全部</a>
                  </div>
                  {artistsInfoArrary?.map(item => {
                    return (
                      <div className="item" key={item.id}>
                        <MusicCard
                          url={item.images[0].url}
                          title={item.name}
                          description={item.type}
                          type={item.type}
                        ></MusicCard>
                        <div className="broadcast"></div>
                      </div>
                    );
                  })}
                </div>
                <div className="album flexItem">
                  <div className="title">
                    <a className="h1">热门专辑</a>
                    <a className="showAll">展示全部</a>
                  </div>
                  {albumsInfoArrary?.map(item => {
                    return (
                      <div className="item" key={item.id}>
                        <MusicCard
                          url={item.images[0].url}
                          title={item.name}
                          description={item.label}
                          type={item.type}
                        ></MusicCard>
                        <div className="broadcast"></div>
                      </div>
                    );
                  })}
                </div>

                <div className="simplifiedShow flexItem">
                  <div className="title">
                    <a className="h1">热门播客</a>
                    <a className="showAll">展示全部</a>
                  </div>
                  {showsEpisodes?.slice(0, 4).map(item => {
                    return (
                      <div className="item" key={item.id}>
                        <MusicCard
                          url={item.images[0].url}
                          title={item.name}
                          description={item.publisher}
                          type={item.type}
                        ></MusicCard>
                        <div className="broadcast"></div>
                      </div>
                    );
                  })}
                </div>
                <div className="playlist flexItem">
                  <div className="title">
                    <p className="h1">精选排行</p>
                  </div>
                  {hotPlayLists?.map(item => {
                    return (
                      <div className="item" key={item.id}>
                        <MusicCard
                          url={item.images[0].url}
                          title={item.name}
                          description={item.description}
                          type={item.type}
                        ></MusicCard>
                        <div className="broadcast"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {show === 'music' && (
              <div className="container">
                <div className="audiobook flexItem">
                  <div className="title">
                    <p className="h1">热门音乐</p>
                  </div>
                  {userTopTracks?.map(item => {
                    return (
                      <div className="item" key={item.id}>
                        <MusicCard
                          url={item.album.images[0].url}
                          title={item.album.name}
                          description={item.album.release_date}
                          type={item.type}
                        ></MusicCard>
                        <div className="broadcast"></div>
                      </div>
                    );
                  })}
                </div>

                <div className="album flexItem">
                  {albumsInfoArrary?.map(item => {
                    return (
                      <div className="item" key={item.id}>
                        <MusicCard
                          url={item.images[0].url}
                          title={item.name}
                          description={item.label}
                          type={item.type}
                        ></MusicCard>
                        <div className="broadcast"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {show === 'podcast' && (
              <div className="container">
                <div className="simplifiedShow flexItem">
                  <div className="title">
                    <p className="h1">热门播客</p>
                  </div>
                  {showsEpisodes?.map(item => {
                    return (
                      <div className="item" key={item.id}>
                        <MusicCard
                          url={item.images[0].url}
                          title={item.name}
                          description={item.publisher}
                          type={item.type}
                        ></MusicCard>
                        <div className="broadcast"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Content>
        </Layout> */
}
