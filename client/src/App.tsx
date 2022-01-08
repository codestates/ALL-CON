import React from 'react';
import ConChinPage from './pages/ConChinPage';
import MainPage from './pages/MainPage';
import ConcertPage from './pages/ConcertPage';
import ConChinCertificationPage from './pages/ConChinCertificationPage';
import MyPage from './pages/MyPage';
import Header from './components/Header';
import ConcertModal from './components/Modals/ConcertPage/ConcertModal';
import MyProfileImageModal from './components/Modals/MyPage/MyProfileImageModal';
import ConChinWritingModal from './components/Modals/ConChinPage/ConChinWritingModal';

function App() {
  return (
    <div className='App'>
      <Header />
      {/* <ConcertPage />
      <ConcertModal /> */}
      {/* <ConChinWritingModal /> */}
      <MainPage />
      {/* <ConChinPage /> */}
      {/* <ConChinCertificationPage /> */}
      {/* <MyPage /> */}
      {/* <div id='modalWrapper'>
        <MyProfileImageModal />
      </div> */}
      {/* <ConChinPage /> */}
    </div>
  );
}
export default App;
