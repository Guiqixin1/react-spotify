// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from '@/pages/Home/home.jsx';
// import Login from '@/pages/Login/login.jsx';
// import HomeIndex from '../pages/Home/homeIndex.jsx';
// import Show from '@/pages/Detail/show.jsx';
// import Album from '@/pages/Detail/album.jsx';
// import Playlist from '@/pages/Detail/playlist.jsx';
// import Artist from '@/pages/Detail/artist.jsx';
// import Tracks from '@/pages/Detail/tracks.jsx';
// import Search from '@/pages/Search/search.jsx';
// import { useSelector } from 'react-redux';
// const AppRouter = () => {
//   const { token } = useSelector(state => state.user);
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={token ? <Home /> : <Login />}>
//           <Route path="/" element={<HomeIndex />} />
//           <Route path="/show/:id" element={<Show />} />
//           <Route path="/album/:id" element={<Album />} />
//           <Route path="/artist/:id" element={<Artist />} />
//           <Route path="/playlist/:id" element={<Playlist />} />
//           <Route path="/tracks/:id" element={<Tracks />} />
//           <Route path="/search" element={<Search />} />
//         </Route>
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRouter;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { lazy, Suspense } from 'react';
import Loading from '../components/Loading.jsx';

const Home = lazy(() => import('@/pages/Home/home.jsx'));
const Login = lazy(() => import('@/pages/Login/login.jsx'));
const HomeIndex = lazy(() => import('../pages/Home/homeIndex.jsx'));
const Show = lazy(() => import('@/pages/Detail/show.jsx'));
const Album = lazy(() => import('@/pages/Detail/album.jsx'));
const Playlist = lazy(() => import('@/pages/Detail/playlist.jsx'));
const Artist = lazy(() => import('@/pages/Detail/artist.jsx'));
const Tracks = lazy(() => import('@/pages/Detail/tracks.jsx'));
const Search = lazy(() => import('@/pages/Search/search.jsx'));
const SearchResultsPage = lazy(
  () => import('@/pages/Search/SearchResultsPage.jsx')
);

const AppRouter = () => {
  const { token } = useSelector(state => state.user);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              {token ? <Home /> : <Login />}
            </Suspense>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <HomeIndex />
              </Suspense>
            }
          />
          <Route
            path="/show/:id"
            element={
              <Suspense fallback={<Loading />}>
                <Show />
              </Suspense>
            }
          />
          <Route
            path="/album/:id"
            element={
              <Suspense fallback={<Loading />}>
                <Album />
              </Suspense>
            }
          />
          <Route
            path="/artist/:id"
            element={
              <Suspense fallback={<Loading />}>
                <Artist />
              </Suspense>
            }
          />
          <Route
            path="/playlist/:id"
            element={
              <Suspense fallback={<Loading />}>
                <Playlist />
              </Suspense>
            }
          />
          <Route
            path="/tracks/:id"
            element={
              <Suspense fallback={<Loading />}>
                <Tracks />
              </Suspense>
            }
          />
          <Route
            path="/search"
            element={
              <Suspense fallback={<Loading />}>
                <Search />
              </Suspense>
            }
          >
            <Route
              path=":searchQuery"
              element={
                <Suspense fallback={<Loading />}>
                  <SearchResultsPage />
                </Suspense>
              }
            />
          </Route>
        </Route>

        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
