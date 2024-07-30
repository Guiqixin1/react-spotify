import './index.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// 引入音乐组件
import MusicCard from '../../components/MusicCard.jsx';
import { useApiClient } from '../../utils/api.jsx';
const SearchResultsPage = () => {
  const navigate = useNavigate();
  const { getSearch } = useApiClient();
  const { searchQuery } = useParams();
  const [TrackList, setTrackList] = useState();
  const [artistsList, setArtistsList] = useState();
  const [albumsList, setAlbumsList] = useState();
  const [playList, setPlayList] = useState();
  const [showsList, setShowsList] = useState();
  // 根据地址动态参数获取数据
  async function getSearchData() {
    const res = await getSearch(searchQuery);
    console.log(res);
    setAlbumsList(res.data.albums);
    setTrackList(res.data.tracks);
    setArtistsList(res.data.artists);
    setPlayList(res.data.playlists);
    setShowsList(res.data.shows);
  }
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
  useEffect(() => {
    console.log(searchQuery);
    getSearchData();
  }, [searchQuery]);
  return (
    <div className="main">
      <div className="content">
        {TrackList?.items?.length > 0 && (
          <div className="artists flexItem">
            <div className="title">
              <a className="h1">Track</a>
            </div>
            {TrackList?.items?.slice(0, 4).map(item => {
              return (
                <div className="item" key={item.id}>
                  <MusicCard
                    url={item?.album?.images[0]?.url}
                    title={item.name}
                    description={item.type}
                    onClick={() => handleDetail(item.id, item.type)}
                  ></MusicCard>
                  <div className="broadcast"></div>
                </div>
              );
            })}
          </div>
        )}
        {artistsList?.items?.length > 0 && (
          <div className="artists flexItem">
            <div className="title">
              <a className="h1">Artist</a>
            </div>
            {artistsList?.items?.slice(0, 4).map(item => {
              return (
                <div className="item" key={item.id}>
                  <MusicCard
                    url={item?.images[0]?.url}
                    title={item.name}
                    description={item.type}
                    onClick={() => handleDetail(item.id, item.type)}
                  ></MusicCard>
                  <div className="broadcast"></div>
                </div>
              );
            })}
          </div>
        )}
        {albumsList?.items?.length > 0 && (
          <div className="album flexItem">
            <div className="title">
              <a className="h1">Album</a>
            </div>
            {albumsList?.items?.slice(0, 4).map(item => {
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
        )}

        {showsList?.items?.length > 0 && (
          <div className="simplifiedShow flexItem">
            <div className="title">
              <a className="h1">Shows</a>
            </div>
            {showsList?.items?.slice(0, 4).map(item => {
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
        )}
        {playList?.items?.length > 0 && (
          <div className="playlist flexItem">
            <div className="title">
              <p className="h1">PlayLists</p>
            </div>
            {playList?.items?.slice(0, 4).map(item => {
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
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
