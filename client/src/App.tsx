/* Component import */
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
import CallbackGoogle from './components/CallBackPage/CallBackGoogle';
import CallbackKaKao from './components/CallBackPage/CallBackKakao';
/* Component import */
/* Library import */
import React from 'react';
import {Routes, Route} from 'react-router-dom';
/* Library import */

function App() {
  return (
    <div className='App'>
      <Header />
      <LoginModal />
      {/* <SignUpModal /> */}
      {/* <TosModal /> */}
      {/*<ConcertModal /> */}
      {/* <ConChinWritingModal /> */}
      <Routes>
        <Route path='/main/*' element={<MainPage />}/>
        {/* <ConcertPage />*/}
        {/* <ConChinPage /> */}
        {/* <ConChinCertificationPage /> */}
        {/* <MyPage /> */}
        <Route path='/callbackGoogle/*' element={<CallbackGoogle />}/>
        <Route path='/callbackKakao/*' element={<CallbackKaKao />}/>
      </Routes>
      <div id='modalWrapper'>
        {/* <MyProfileImageModal /> */}
        {/* <ConfirmNumberModal />
        <FindPasswordModal /> */}
        {/* <ResetPasswordModal /> */}
      </div>
    </div>
  );
}
export default App;
