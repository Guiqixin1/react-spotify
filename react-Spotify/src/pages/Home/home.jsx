import './index.scss';
import HeaderNav from '@/components/HeaderNav.jsx';
const contentStyle = {
  textAlign: 'center',
  minHeight: '75vh',
  lineHeight: '120px',
  color: '#fff',
  overflowY: 'scroll',
  backgroundColor: '#1C1C1C',
  width: '58vw'
};

const siderStyle = {
  color: '#E1E1E1',
  backgroundColor: '#000000',
  overflow: 'hidden',
  height: '90vh',
  boxSizing: 'border-box'
};

const layoutStyle = {
  borderRadius: 8,
  // overflow: "hidden",
  width: '100vw',
  height: '90vh',
  backgroundColor: '#000000'
};
import { Flex, Layout, Col, Row, Card } from 'antd';
// 按需引入antd图标
import { SpotifyFilled, BankFilled, SearchOutlined } from '@ant-design/icons';
import arrow from '@/assets/arrow.png';
import stack from '@/assets/stack.png';
import plus from '@/assets/plus.png';
import Search from '@/assets/search.png';
import queue from '@/assets/queue.png';

// 引入Effect在页面挂载后执行
import { useEffect, useState, useRef } from 'react';
// 引入useLocation
import { useLocation } from 'react-router-dom';

const { Sider, Content } = Layout;

// 引入api接口
import { useApiClient } from '../../utils/api.jsx';

import MusicCard from '../../components/MusicCard';

// 引入请求头更新函数
// import { updateToken } from '../../utils/request';

// 引入音乐播放器
import MusicPlayer from '../../components/MusicPlayer';

// 组件
const Home = () => {
  const location = useLocation();
  const {
    getSeveralArtists,
    getSeveralAlbums,
    getUserToptracks,
    getSeveralShows,
    getRecommendationPlaylists
  } = useApiClient();
  // 首页内容的数组
  const [artistsInfoArrary, setArtistsInfoArrary] = useState([]);
  const [albumsInfoArrary, setAlbumsInfoArrary] = useState([]);
  const [userTopTracks, setUserTopTracks] = useState([]);
  const [showsEpisodes, setshowsEpisodes] = useState([]);
  const [hotPlayLists, setHotPlayLists] = useState([]);
  let accessToken = '';
  useEffect(() => {
    if (location.hash) {
      const urlParams = new URLSearchParams(location.hash.substring(1)); // 使用substring替代了substr
      accessToken = urlParams.get('access_token');
      // updateToken(accessToken);
      getHomeContent();
    }
  }, [location]);
  // 首页的内容获取

  async function getHomeContent() {
    const artits = await getSeveralArtists();
    const albums = await getSeveralAlbums();
    const userTopTracks = await getUserToptracks();
    const shows = await getSeveralShows();
    const hotSongs = await getRecommendationPlaylists('37i9dQZEVXbNG2KDcFcKOF');
    const hotFastSongs = await getRecommendationPlaylists(
      '37i9dQZEVXbLiRSasKsNU9'
    );
    const hotSongArray = [];
    hotSongArray.push(hotSongs.data, hotFastSongs.data);
    setHotPlayLists(hotSongArray);
    setshowsEpisodes(shows.data.shows);
    setArtistsInfoArrary(artits.data.artists);
    setAlbumsInfoArrary(albums.data.albums);
    setUserTopTracks(userTopTracks.data.items);
  }

  // playlists标识符
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

  return (
    <Flex gap="middle" wrap>
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
        <Layout>
          <Content style={contentStyle}>
            <div className="header">
              <HeaderNav handleData={handleData} show={show}></HeaderNav>
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
        </Layout>
        <Sider width="21%"></Sider>
      </Layout>

      <div>
        <MusicPlayer accessToken={accessToken} />
      </div>
    </Flex>
  );
};

export default Home;
