const contentStyle = {
  textAlign: 'center',
  minHeight: '75vh',
  lineHeight: '120px',
  color: '#fff',
  overflowY: 'scroll',
  backgroundColor: '#1C1C1C',
  dispalay: 'flex',
  left: '21vw',
  width: '79vw'
};
const layoutStyle = {
  borderRadius: 8,
  width: '100vw',
  height: '90vh',
  backgroundColor: '#000000'
};

import './index.scss';
import HeaderNav from '@/components/HeaderNav.jsx';
import { Flex, Layout, Skeleton } from 'antd';
import { useEffect, useState, useRef } from 'react';
// 引入useLocation
import { useLocation } from 'react-router-dom';
const { Content } = Layout;
// 引入api接口
import { useApiClient } from '../../utils/api.jsx';
import MusicCard from '../../components/MusicCard';

const HomeIndex = () => {
  const location = useLocation();
  const [loading, setLoding] = useState(true);
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
  useEffect(() => {
    getHomeContent();
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
    const dailyRecommendation1 = await getRecommendationPlaylists(
      '37i9dQZF1E35Asb7SMuWG2'
    );
    const dailyRecommendation2 = await getRecommendationPlaylists(
      '37i9dQZF1E39vKbmddook8'
    );
    const hotSongArray = [];
    hotSongArray.push(
      hotSongs.data,
      hotFastSongs.data,
      dailyRecommendation1.data,
      dailyRecommendation2.data
    );
    setHotPlayLists(hotSongArray);
    setshowsEpisodes(shows.data.shows);
    setArtistsInfoArrary(artits.data.artists);
    setAlbumsInfoArrary(albums.data.albums);
    setUserTopTracks(userTopTracks.data.items);
    setLoding(false);
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
  // 判断右侧导航是否出现的标识
  const [showRightNav, setShowRightNav] = useState(false);

  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <Flex gap="middle" wrap>
          <Layout style={layoutStyle}>
            <Content style={contentStyle}>
              <div className="header">
                <HeaderNav
                  handleData={handleData}
                  show={show}
                  //   flag={showRightNav}
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
          </Layout>
        </Flex>
      )}
    </>
  );
};

export default HomeIndex;
