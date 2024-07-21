import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home/home.jsx';
import Login from '@/pages/Login/login.jsx';
import Detail from '@/pages/Detail/detail.jsx';
import HomeIndex from '../pages/Home/homeIndex.jsx';
import { useSelector } from 'react-redux';
const AppRouter = () => {
  const { token } = useSelector(state => state.persistedUseReducer);
  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />}>
          <Route path="/" element={<HomeIndex />} />
          <Route path="/detail" element={<Detail />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
