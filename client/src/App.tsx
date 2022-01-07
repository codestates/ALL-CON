import React from 'react';
import ConChinPage from './pages/ConChinPage';
import MainPage from './pages/MainPage';
import ConcertPage from './pages/ConcertPage';
import MyPage from './pages/MyPage';
import Header from './components/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      <MyPage />
      {/* <ConChinPage /> */}
      {/* <MainPage /> */}
      {/* <ConcertPage /> */}
    </div>
  );
}
export default App;
