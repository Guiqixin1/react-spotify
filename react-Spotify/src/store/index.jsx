import { configureStore } from '@reduxjs/toolkit';
import useReducer from './modules/user';

const store = configureStore({ reducer: { useReducer } });

export default store;
