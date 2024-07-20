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

// // 异步方法 完成登录获取token
// const fetchLogin = loginForm => {
//   return async dispatch => {
//     //1.发送异步请求
//     const res = await loginAPI(loginForm); //2.提交同步action进行token存入
//     dispatch(setToken(res.data.accessToken)); // return res
//   };
// };

// // 注册
// const fetchRegister = registerForm => {
//   return async () => {
//     await registerAPI(registerForm);
//   };
// };

// export { fetchLogin, fetchRegister };

export default useReducer;
