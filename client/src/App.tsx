import React from 'react';
import ConChinPage from './pages/ConChinPage';
import MainPage from './pages/MainPage';
import Header from '../src/components/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      {/* <MainPage /> */}
      <ConChinPage />
    </div>
  );
}
export default App;
