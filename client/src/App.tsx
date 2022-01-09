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
import LoginModal from './components/Modals/LoginModal';
import SignUpModal from './components/Modals/SignUpModal';
import TosModal from './components/Modals/TosModal';

function App() {
  return (
    <div className='App'>
      <Header />
      {/* <LoginModal /> */}
      <TosModal />
    </div>
  );
}
export default App;
