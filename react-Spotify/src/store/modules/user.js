import { createSlice } from '@reduxjs/toolkit';

const userStore = createSlice({
  name: 'user', // 数据状态
  initialState: {
    token: ''
  }, // 同步修改方法
  reducers: {
    //保存token
    setToken(state, action) {
      state.token = action.payload; // saveToken(state.token)
    }
  }
});

// 解构出actionCreater
export const { setToken } = userStore.actions;

// 获取reducer函数
const useReducer = userStore.reducer;

export default useReducer;
