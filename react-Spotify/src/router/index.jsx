import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect
} from 'react-router-dom';
import Home from '@/pages/Home/home.jsx';
import Login from '@/pages/Login/login.jsx';
import { useSelector } from 'react-redux';
const AppRouter = () => {
  const { token } = useSelector(state => state.useReducer);
  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login />} />

        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
