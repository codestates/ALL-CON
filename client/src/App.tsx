import React from 'react';
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
function App() {
  return (
    <div className='App'>
      <Header />
      {/* <ConcertPage /> */}
      {/* <ConChinWritingModal /> */}
      {/* <MainPage /> */}
      <ConChinPage />
      {/* <ConChinCertificationPage /> */}
      {/* <MyPage /> */}
      {/* <MyEditPage /> */}
      {/* <TosModal /> */}
      {/* <LoginModal /> */}
      {/* <SignUpModal /> */}
      {/* <div id='modalWrapper'> */}
      {/* <MyProfileImageModal /> */}
      {/* <MyProfileResignMembershipModal /> */}
      {/* <ConfirmNumberModal />
      <FindPasswordModal /> */}
      {/* <ResetPasswordModal /> */}
      {/* <ConChinProfileModal /> */}
      {/* </div> */}
    </div>
  );
}
export default App;
