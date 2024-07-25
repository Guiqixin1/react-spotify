// 创建歌单仓库
import { createSlice } from '@reduxjs/toolkit';
// import { useApiClient } from '@/utils/api';

const audioListStore = createSlice({
  name: 'audioList',
  initialState: {
    audioLists: [],
    playIndex: 0
  },
  // 同步修改方法
  reducers: {
    addAudioList(state, action) {
      state.audioLists.push(action.payload);
    },
    setCurrentAudio(state, action) {
      state.audioLists = action.payload;
    },
    setPlayIndex(state, action) {
      state.playIndex = action.payload;
    }
  }
});
// 解构出actionCreater
export const { addAudioList, setCurrentAudio, setPlayIndex } =
  audioListStore.actions;

// 获取reducer函数
const audioListReducer = audioListStore.reducer;

export default audioListReducer;
