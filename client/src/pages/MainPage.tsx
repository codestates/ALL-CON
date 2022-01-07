import Jumbotron from '../components/Jumbotron';
import MainConcertInfo from '../components/MainPage/MainConcertInfo';
import MainFindConchin from '../components/MainPage/MainFindConchin';
import MainComment from '../components/MainPage/MainComment';
import Footer from '../components/Footer';

function MainPage() {
  return (
    <div id='mainContainer'>
      <div id='mainJumboWrapper'>
        <Jumbotron />
      </div>
      <div id='mainConcertInfoWrapper'>
        <MainConcertInfo />
      </div>
      <div id='mainCommentWrapper'>
        <MainComment />
        <div id='paginationWrapper'>
          <div id='pagination'>
            <ul className='page'>
              <p className='text'>1</p>
            </ul>
            <ul className='page'>
              <p className='text'>2</p>
            </ul>
            <ul className='page'>
              <p className='text'>3</p>
            </ul>
            <ul className='page'>
              <p className='text'>4</p>
            </ul>
            <ul className='page'>
              <p className='text'>5</p>
            </ul>
          </div>
        </div>
      </div>
      <div id='mainFindConchinWrapper'>
        <MainFindConchin />
      </div>
      <div id='mainFooterWrapper'>
        <Footer />
      </div>
    </div>
  );
}

export default MainPage;
