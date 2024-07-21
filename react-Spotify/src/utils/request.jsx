import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '@/store/modules/user';
import { message } from 'antd';
const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.persistedUseReducer);

  const instance = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  // 请求拦截器
  instance.interceptors.request.use(
    config => {
      // 在发送请求之前做些什么
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  instance.interceptors.response.use(
    response => {
      // 对响应数据做点什么
      return response;
    },
    error => {
      // 对响应错误做点什么
      if (error.response && error.response.status === 401) {
        dispatch(setToken(''));
        // 弹出提醒用户重新登录的模态框
        showMessageOnce();
        navigate('/login');
        return;
      }
      return Promise.reject(error);
    }
  );

  const showLoginModal = () => {
    // 显示登录模态框的代码
    message.error('登录已过期,请重新登录');
  };

  return instance;
};

export default useAxiosInterceptor;
