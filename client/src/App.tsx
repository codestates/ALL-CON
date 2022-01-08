import React from 'react';
import ConChinPage from './pages/ConChinPage';
import MainPage from './pages/MainPage';
import ConcertPage from './pages/ConcertPage';
import Header from './components/Header';
import ConcertModal from './components/Modals/ConcertPage/ConcertModal';
import ConChinWritingModal from './components/Modals/ConChinPage/ConChinWritingModal';

function App() {
  return (
    <div className='App'>
      <Header />
      <ConcertModal />
    </div>
  );
}
export default App;
