import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/modules/user.js';
import './index.scss';

const SpotifyAuth = () => {
  const [accessToken, setAccessToken] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = getHashParams();
    setAccessToken(params.access_token);
    dispatch(setToken(params.access_token));

    // 清除地址栏中的 token 信息
    window.history.replaceState({}, document.title, '/');
  }, [dispatch]);

  const getHashParams = () => {
    const hashParams = {};
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    let e;
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  const redirectToSpotifyAuth = () => {
    const client_id = '313648b42cd34fef9a1d7e6c2c13e232';
    const redirect_uri = 'http://localhost:5173';
    const scopes =
      'user-read-private user-read-playback-state streaming user-modify-playback-state playlist-modify-public user-library-modify user-top-read user-read-currently-playing playlist-read-private user-follow-read user-read-recently-played playlist-modify-private user-follow-modify user-library-read user-read-email';
    window.location.replace(
      `https://accounts.spotify.com/authorize?show_dialog=true&response_type=token&client_id=${client_id}&scope=${encodeURIComponent(
        scopes
      )}&redirect_uri=${encodeURIComponent(redirect_uri)}`
    );
  };

  return (
    <div className="login-container">
      <h1>登录到 Spotify</h1>
      {!accessToken ? (
        <div className="login">
          <button onClick={redirectToSpotifyAuth}>Log in with Spotify</button>
        </div>
      ) : (
        <p>登录成功</p>
      )}
    </div>
  );
};

export default SpotifyAuth;
