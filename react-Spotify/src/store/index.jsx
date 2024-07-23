import { configureStore } from '@reduxjs/toolkit';
import useReducer from './modules/user';
import audioListReducer from './modules/audioList';
// redux持久化
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// 持久化配置
const persistConfig = { key: 'root', storage };

// 持久化 reducer
const persistedUseReducer = persistReducer(persistConfig, useReducer);
const persistedAudioListReducer = persistReducer(
  persistConfig,
  audioListReducer
);

const store = configureStore({
  reducer: { persistedUseReducer, persistedAudioListReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['register', 'rehydrate']
      }
    })
});

const persistor = persistStore(store);

export { store, persistor };
