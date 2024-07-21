import { configureStore } from '@reduxjs/toolkit';
import useReducer from './modules/user';
// redux持久化
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// 持久化配置
const persistConfig = { key: 'root', storage };

// 持久化 reducer
const persistedUseReducer = persistReducer(persistConfig, useReducer);

const store = configureStore({
  reducer: { persistedUseReducer },
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
