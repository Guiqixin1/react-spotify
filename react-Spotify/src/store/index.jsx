// import { configureStore } from '@reduxjs/toolkit';
// import useReducer from './modules/user';
// import audioListReducer from './modules/audioList';
// // redux持久化
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// // 持久化配置
// const persistConfig = {
//   key: 'root',
//   storage,
//   version: 3,
//   whitelist: ['audioLists', 'token', 'audioInfo']
// };

// const persistedUseReducer = persistReducer(persistConfig, useReducer);
// const persistedAudioListReducer = persistReducer(
//   persistConfig,
//   audioListReducer
// );
// const store = configureStore({
//   reducer: { persistedUseReducer, persistedAudioListReducer },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['persist/PERSIST'],
//         ignoredPaths: ['register', 'rehydrate']
//       }
//     })
// });

// const persistor = persistStore(store);

// export { store, persistor };

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import useReducer from './modules/user';
import audioListReducer from './modules/audioList';
import { combineReducers } from 'redux';

// 使用combineReducer 将多个reducer 组合成一个 rootReducer
// const rootReducer = combineReducers({
//   user: useReducer,
//   audioLists: audioListReducer
// });

// 配置redux-persist
const persistConfig = { key: 'root', storage };

// 使用 persistReducer 包装 reducer
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: useReducer,
    audioLists: audioListReducer
  })
);

// 使用 configureStore 创建 store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

// 创建持久化 store
const persistor = persistStore(store);

// 导出 store 和 persistor
export { store, persistor };
