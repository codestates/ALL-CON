/* Component import */
import ConChinPage from './pages/ConChinPage';
import MainPage from './pages/MainPage';
import ConcertPage from './pages/ConcertPage';
import ConChinCertificationPage from './pages/ConChinCertificationPage';
import MyPage from './pages/MyPage';
import MyEditPage from './pages/MyEditPage';
import Header from './components/Header';
import ConcertModal from './components/Modals/ConcertPage/ConcertModal';
import MyProfileImageModal from './components/Modals/MyPage/MyProfileImageModal';
import MyProfileResignMembershipModal from './components/Modals/MyPage/MyProfileResignMembershipModal';
import ConChinWritingModal from './components/Modals/ConChinPage/ConChinWritingModal';
import ConChinProfileModal from './components/Modals/ConChinPage/ConChinProfileModal';
import LoginModal from './components/Modals/LoginModal';
import SignUpModal from './components/Modals/SignUpModal';
import TosModal from './components/Modals/TosModal';
import FindPasswordModal from './components/Modals/FindPasswordModal';
import ConfirmNumberModal from './components/Modals/ConfirmNumberModal';
import ResetPasswordModal from './components/Modals/ResetPasswordModal';
import LandingPage from './pages/LandingPage';
import CallbackGoogle from './components/CallBackPage/CallBackGoogle';
import CallbackKaKao from './components/CallBackPage/CallBackKakao';
/* Component import */
/* Library import */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Header />

      {/* <SignUpModal /> */}
      {/* <TosModal /> */}
      {/* <ConcertModal /> */}
      {/* <ConChinWritingModal /> */}
      {/* <ConfirmNumberModal />
      <FindPasswordModal /> */}
      {/* <LoginModal /> */}
      {/* <MyProfileImageModal /> */}
      {/* <MyProfileResignMembershipModal /> */}
      {/* <ResetPasswordModal /> */}

      {/* <LandingPage /> */}
      {/* <MainPage /> */}
      {/* <ConcertPage /> */}
      {/* <ConChinPage /> */}
      {/* <MyPage /> */}
      {/* <ConChinCertificationPage /> */}

      <Routes>
        <Route path='/main/*' element={<MainPage />} />
        <Route path='/callbackGoogle/*' element={<CallbackGoogle />} />
        <Route path='/callbackKakao/*' element={<CallbackKaKao />} />
      </Routes>
    </div>
  );
}
export default App;
