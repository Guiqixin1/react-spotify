import './index.scss';
import HeaderNav from '@/components/HeaderNav.jsx';
import { Flex, Layout } from 'antd';
import { useEffect, useState } from 'react';
// 引入useLocation
import { useLocation, useNavigate } from 'react-router-dom';
const { Content } = Layout;
// 引入api接口
import { useApiClient } from '../../utils/api.jsx';
import MusicCard from '../../components/MusicCard';
// 引入loading组件
import Loading from '@/components/Loading';

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
    const weekSongs = await getRecommendationPlaylists(
      '37i9dQZEVXcWedpVrQlrwl'
    );
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
      weekSongs.data,
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

  // 默认获取首页的内容 标识
  const [show, setShow] = useState('all');
  // 点击顶部导航显示相应页面
  function handleData(value) {
    if (value !== show) {
      setShow(value);
    }
  }
  const navigate = useNavigate();
  // 导航到 详情页的事件处理函数
  const handleDetail = (id, type) => {
    // navigate(`/detail/${id}`);
    if (type === 'album') {
      navigate(`/album/${id}`);
    } else if (type === 'artist') {
      navigate(`/artist/${id}`);
    } else if (type === 'show') {
      navigate(`/show/${id}`);
    } else if (type === 'playlist') {
      navigate(`/playlist/${id}`);
    } else if (type === 'track') {
      navigate(`/tracks/${id}`);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="content">
          <div className="header">
            <HeaderNav
              handleData={handleData}
              show={show}
              //   flag={showRightNav}
            ></HeaderNav>
          </div>

          <div className="main">
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
                          onClick={() => handleDetail(item.id, item.type)}
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
                          onClick={() => handleDetail(item.id, item.type)}
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
                      <div
                        className="item"
                        key={item.id}
                        onClick={() => handleDetail(item.id, item.type)}
                      >
                        <MusicCard
                          url={item.images[0].url}
                          title={item.name}
                          description={item.label}
                          onClick={() => handleDetail(item.id, item.type)}
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
                          onClick={() => handleDetail(item.id, item.type)}
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
                  {hotPlayLists?.slice(0, 4).map(item => {
                    return (
                      <div className="item" key={item.id}>
                        <MusicCard
                          url={item.images[0].url}
                          title={item.name}
                          description={item.description}
                          onClick={() => handleDetail(item.id, item.type)}
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
                          onClick={() => handleDetail(item.id, item.type)}
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
                          onClick={() => handleDetail(item.id, item.type)}
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
                          onClick={() => handleDetail(item.id, item.type)}
                        ></MusicCard>
                        <div className="broadcast"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HomeIndex;
