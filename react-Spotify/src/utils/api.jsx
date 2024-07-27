// 引入token拦截器模块
import useAxiosInterceptor from './request';

export function useApiClient() {
  const { instance } = useAxiosInterceptor();

  // 1. 获取一些艺术家
  const getSeveralArtists = (
    ids = '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6,0TnOYISbd1XYRBk9myaseg'
  ) => {
    return instance.get(`/artists?ids=${ids}`);
  };
  // 2. 获取一些的专辑
  const getSeveralAlbums = (
    ids = '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc,4aawyAB9vmqN3uQ7FjRGTy'
  ) => {
    return instance(`/albums?ids=${ids}`);
  };
  // 3. 根据计算出的亲和度，获取当前用户的热门艺术家或音轨。
  const getUserToptracks = (type = 'tracks') => {
    return instance.get(`/me/top/${type}?limit=10&offset=5`);
  };

  // 4. 获取多个节目
  const getSeveralShows = (
    ids = '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ,11VjrLJfoiNvgjjqov4RWh,7H4xqBcvVafN7hs3BJMeHE,4yXsMW1CFOjL17OFbdca0L,4J3UybFDArcDcxJPKj0OyH,0sBh58hSTReUQiK4axYUVx,0XrOqvxlqQI6bmdYHuIVnr,1HdyrFUvxIXAGlNLXlX5Pt'
  ) => {
    return instance.get(`/shows?ids=${ids}`);
  };

  // 5. 获取精选排行的播放列表
  const getRecommendationPlaylists = id => {
    return instance.get(`/playlists/${id}`);
  };
  // 6. 获取单个曲目的相关信息
  const getTrack = id => {
    return instance.get(`/tracks/${id}`);
  };
  // 7. 获取单个艺术家
  const getArtist = id => {
    return instance.get(`/artists/${id}`);
  };
  return {
    getSeveralArtists,
    getSeveralAlbums,
    getUserToptracks,
    getSeveralShows,
    getRecommendationPlaylists,
    getTrack,
    getArtist
  };
}
