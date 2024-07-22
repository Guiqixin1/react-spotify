import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home/home.jsx';
import Login from '@/pages/Login/login.jsx';
import HomeIndex from '../pages/Home/homeIndex.jsx';
import Show from '@/pages/Detail/show.jsx';
import Album from '@/pages/Detail/album.jsx';
import Playlist from '@/pages/Detail/playlist.jsx';
import Artist from '@/pages/Detail/artist.jsx';
import Tracks from '@/pages/Detail/tracks.jsx';
import { useSelector } from 'react-redux';
const AppRouter = () => {
  const { token } = useSelector(state => state.persistedUseReducer);
  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />}>
          <Route path="/" element={<HomeIndex />} />
          <Route path="/show/:id" element={<Show />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/artist/:id" element={<Artist />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/tracks/:id" element={<Tracks />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
