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
import FindPasswordModal from './components/Modals/FindPasswordModal';
import ConfirmNumberModal from './components/Modals/ConfirmNumberModal';
import ResetPasswordModal from './components/Modals/ResetPasswordModal';
import LandingPage from './pages/LandingPage';
function App() {
  return (
    <div className='App'>
      <Header />
      <MainPage />
      {/* <div id='modalWrapper'> */}
      {/* <MyProfileImageModal /> */}
      {/* <ConfirmNumberModal /> */}
      {/* <FindPasswordModal /> */}
      {/* <ResetPasswordModal /> */}
      {/* </div> */}
    </div>
  );
}
export default App;
