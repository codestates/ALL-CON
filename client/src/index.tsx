/* CSS import */
import './style.css';
/* Component import */
import App from './App';
import * as serviceWorker from './serviceWorker';
/* Store import */
import authSlice, { auth } from './store/AuthSlice';
import modalSlice, { modal } from './store/ModalSlice';
import headerSlice, { header } from './store/HeaderSlice';
import mainSlice, { main } from './store/MainSlice';
import conChinSlice, { conChin } from './store/ConChinSlice';
import ConcertCommentSlice, { concertComments } from './store/ConcertCommentSlice';
/* Library import */
import { BrowserRouter as Router } from 'react-router-dom';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, PERSIST } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import storage from 'redux-persist/lib/storage';

/* persist 선언 */
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

/* reducer 세팅 */
const reducers = combineReducers({
  auth: authSlice,
  modal: modalSlice,
  header: headerSlice,
  main: mainSlice,
  conChin: conChinSlice,
  concertComments: ConcertCommentSlice
});

/* persist reducer 세팅 (persistConfig가 추가된 reducer) */
const persistedReducer = persistReducer(persistConfig, reducers);

/* store 세팅 */
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

/* RootState Type 세팅 */
export interface RootState {
  auth: auth;
  modal: modal;
  header: header;
  main: main;
  conChin: conChin;
  concertComments: concertComments;
}

/* persist store 세팅 (새로고침, 종료해도 지속될 store) */
export let persistor = persistStore(store);
persistor.purge();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
