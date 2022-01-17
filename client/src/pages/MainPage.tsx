/* Component import */
import Footer from '../components/Footer';
import Jumbotron from '../components/Jumbotron';
import MainComment from '../components/MainPage/MainComment';
import MainConcertInfo from '../components/MainPage/MainConcertInfo';
import MainFindConchin from '../components/MainPage/MainFindConchin';
import MainPagination from '../components/MainPage/MainPagination';
/* Store import */
import { RootState } from '../index';
/* Library import */
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function MainPage() {
  const { target } = useSelector((state: RootState) => state.main);

  useEffect(() => {
    
  }, [target]);

  return (
    <div id='mainContainer'>
      <div id='mainJumboWrapper'>
        <Jumbotron />
      </div>
      <div id='mainConcertInfoWrapper'>{target && <MainConcertInfo />}</div>
      <div id='mainCommentWrapper'>{target && <MainComment />}</div>
      <div id='mainPaginationWrapper'>{target && <MainPagination />}</div>
      <div id='mainFindConchinWrapper'>
        <MainFindConchin />
      </div>
      <div id='fullFooter'>
        <div id='mainFooterWrapper'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
